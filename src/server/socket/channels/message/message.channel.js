const ChannelBase = require('../channel.base');
const channelNames = require('../channel.names');

class MessageChannel extends ChannelBase {

    constructor(io) {
        super(io, channelNames.message);
    }
}

module.exports = MessageChannel;