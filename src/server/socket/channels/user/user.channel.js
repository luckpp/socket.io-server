const ChannelBase = require('../channel.base');
const channelNames = require('../channel.names');

class UserChannel extends ChannelBase {

    constructor(io) {
        super(io, channelNames.user);
    }
}

module.exports = UserChannel;