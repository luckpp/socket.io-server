const Base = require('../../../infrastructure/base');

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

}

module.exports = ChannelBase;