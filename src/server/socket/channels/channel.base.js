const Base = require('../../../infrastructure/base');
const Status = require('../status');

class ChannelBase extends Base {

    constructor(io, channelId) {
        super();

        this.id = channelId;

        this.channel = io.of(`/${channelId}`);
        this.channel.on('connection', (socket) => {
            this.logger.debug(`[${channelId}] Socket [${socket.id}] connected:`, socket.handshake.query);
            socket.on('disconnect', () => {
                this.logger.debug(`[${channelId}] Socket [${socket.id}] disconnected.`);
            });
        });
    }

    emit(event) {
        try {
            this.channel.emit(event.id, event.payload);
            return new Status(true, `Message delivered on channel [${this.id}]`);
        } catch (error) {
            this.logger.error(error);
            return new Status(false, error.message);
        }
    }

}

module.exports = ChannelBase;