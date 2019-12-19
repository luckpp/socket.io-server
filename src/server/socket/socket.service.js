const socket = require('socket.io');
const Base = require('../../infrastructure/base');
const eventValidator = require('./events/event.validator');
const Status = require('./status');
const channelFactory = require('./channels/channel.factory');

class SocketService extends Base {

    constructor() {
        super();
    }

    startListening(server) {
        let io = socket(server);
        this.attachMiddleware(io);
        let channels = channelFactory.createChannels(io);

        this.io = io;
        this.channels = channels;
    }

    processEvent(eventWrapper) {
        let status = eventValidator.validateWrapper(eventWrapper);
        if (status.success) {
            status = this.emitEvent(eventWrapper);
        }
        return status;
    }

    // for internal use
    emitEvent(eventWrapper) {
        let channelName = eventWrapper.channelName;
        let event = eventWrapper.event;

        let channel = this.channels[channelName];
        if (!channel) {
            return new Status(false, `Unable to find channel [${channelName}]`);
        } 
        let status = channel.emit(event);
        return status;
    }

    // for internal use
    attachMiddleware(io) {
        io.use((socket, next) => {
            let token = socket.handshake.query.token;
            this.logger.debug(`[SocketService] Verify token [${token}]`);
            if (token == 'tralala') { // TODO: make proper checks
                next();
            } else {
                next(new Error('authentication error'));
            }
        });
    }
}

module.exports = new SocketService();