const ChannelBase = require('../channel.base');
const ChannelIds = require('../channel.ids');

class MessengerChannel extends ChannelBase {

    constructor(io) {
        super(io, ChannelIds.messenger);
    }
}

module.exports = MessengerChannel;