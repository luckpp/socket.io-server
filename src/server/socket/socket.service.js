const socket = require('socket.io');
const Base = require('../../infrastructure/base');
const MessengerChannel = require('./channels/messenger/messenger.channel');
const UserChannel = require('./channels/user/user.channel');

class SocketService extends Base {

    constructor() {
        super();
        this.channels = {};
    }

    startListening(server) {
        this.io = socket(server);

        let messengerChannel = new MessengerChannel(this.io);
        let deviceChannel = new UserChannel(this.io);

        this.channels[messengerChannel.id] = messengerChannel;
        this.channels[deviceChannel.id] = deviceChannel;
    }

    emitEvent(channelId, eventName, eventPayload) {
        this.logger.info(`Channel [${channelId}], EventName: [${eventName}], EventPayload:`, eventPayload);
        if (this.channels[channelId]) {
            this.channels[channelId].channel.emit(eventName, eventPayload);
        }
    }

    // Deprecated

    startListeningDefault(server) {
        this.io = socket(server);
        this.io.on('connection', (socket) => {
            this.logger.debug(`Socket [${socket.id}] connected:`, socket.handshake.query);
            socket.on('disconnect', () => {
                this.logger.debug(`Socket [${socket.id}] disconnected`);
            });
        });
    }

    emitEventDefault(eventName, eventPayload) {
        this.logger.info(eventName, eventPayload);
        if (this.io && this.io.sockets) {
            this.io.sockets.emit(eventName, eventPayload);
        }
    }
}

module.exports = new SocketService();