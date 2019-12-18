const ChannelBase = require('../channel.base');
const channelNames = require('../channel.names');

class ApplicationChannel extends ChannelBase {

    constructor(io) {
        super(io, channelNames.application);
    }
}

module.exports = ApplicationChannel;