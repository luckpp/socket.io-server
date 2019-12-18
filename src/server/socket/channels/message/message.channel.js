const ChannelBase = require('../channel.base');
const ChannelIds = require('../channel.ids');

class MessageChannel extends ChannelBase {

    constructor(io) {
        super(io, ChannelIds.message);
    }
}

module.exports = MessageChannel;