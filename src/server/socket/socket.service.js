const socket = require('socket.io');
const Base = require('../../infrastructure/base');
const MessengerChannel = require('./channels/message/message.channel');
const UserChannel = require('./channels/user/user.channel');
const eventValidator = require('./events/event.validator');
const Status = require('./status');

class SocketService extends Base {

    constructor() {
        super();
    }

    startListening(server) {

        let io = socket(server);
        this.attachMiddleware(io);
        let channels = this.createChannels(io);

        this.io = io;
        this.channels = channels;
    }

    // for internal use
    attachMiddleware(io) {
        io.use((socket, next) => {
            let token = socket.handshake.query.token;
            this.logger.debug(`Verify token [${token}]`);
            if (token == 'tralala') {
                next();
            } else {
                next(new Error('authentication error'));
            }
        });
    }

    // for internal use
    createChannels(io) {
        let channels = {};

        let messengerChannel = new MessengerChannel(io);
        channels[messengerChannel.name] = messengerChannel;

        let deviceChannel = new UserChannel(io);
        channels[deviceChannel.name] = deviceChannel;

        return channels;
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
}

module.exports = new SocketService();