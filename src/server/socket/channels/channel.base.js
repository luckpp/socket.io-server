const Base = require('../../../infrastructure/base');
const Status = require('../status');

class ChannelBase extends Base {

    constructor(io, channelName) {
        super();

        this.name = channelName;

        this.channel = io.of(`/${channelName}`);
        this.channel.on('connection', (socket) => {
            this.logger.debug(`Channel [${channelName}] socket id [${socket.id}] connected:`, socket.handshake.query);
            socket.on('disconnect', () => {
                this.logger.debug(`Channel [${channelName}] socket id [${socket.id}] disconnected.`);
            });
        });
    }

    emitEvent(event) {
        try {
            this.channel.emit(event.name, event.payload);
            return new Status(true, `Message delivered to channel [${this.name}]`);
        } catch (error) {
            this.logger.error(error);
            return new Status(false, error.message);
        }
    }

}

module.exports = ChannelBase;