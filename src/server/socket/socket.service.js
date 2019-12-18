const socket = require('socket.io');
const Base = require('../../infrastructure/base');

class SocketService extends Base {

    constructor() {
        super();
        this.channels = {};
    }

    startListening(server) {
        this.io = socket(server);

        let messengerChannel = this.io.of('/messenger/data');
        messengerChannel.on('connection', (socket) => {
            this.logger.debug(`[MessengerChannel] Socket [${socket.id}] connected:`, socket.handshake.query);
            socket.on('disconnect', () => {
                this.logger.debug(`[MessengerChannel] Socket [${socket.id}] disconnected.`);
            });
        });
        this.channels['messenger'] = messengerChannel;
    }

    emitEvent(channel, eventName, eventPayload) {
        this.logger.info(`Channel [${channel}], EventName: [${eventName}], EventPayload:`, eventPayload);
        if (this.channels[channel]) {
            this.channels[channel].emit(eventName, eventPayload);
        }
    }

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