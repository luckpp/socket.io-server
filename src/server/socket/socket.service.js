const socket = require('socket.io');
const Base = require('../../infrastructure/base');
const MessengerChannel = require('./channels/message/message.channel');
const UserChannel = require('./channels/user/user.channel');

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

    createChannels(io) {
        let channels = {};

        let messengerChannel = new MessengerChannel(io);
        channels[messengerChannel.id] = messengerChannel;

        let deviceChannel = new UserChannel(io);
        channels[deviceChannel.id] = deviceChannel;

        return channels;
    }

    emitEvent(channelId, eventName, eventPayload) {
        this.logger.info(`Channel [${channelId}], EventName: [${eventName}], EventPayload:`, eventPayload);
        if (this.channels[channelId]) {
            this.channels[channelId].channel.emit(eventName, eventPayload);
        }
    }
}

module.exports = new SocketService();