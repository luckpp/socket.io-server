const ChannelBase = require('../channel.base');
const ChannelIds = require('../channel.ids');

class UserChannel extends ChannelBase {

    constructor(io) {
        super(io, ChannelIds.user);
    }
}

module.exports = UserChannel;