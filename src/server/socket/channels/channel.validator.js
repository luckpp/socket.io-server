const Base = require('../../../infrastructure/base');
const channelIds = require('./channel.ids');

class ChannelValidator extends Base {

    constructor() {
        super();
        this.values = Object.values(channelIds); 
    }

    isValid(channelId) {
        return this.values
            && this.values.includes(channelId);
    }
}

module.exports = new ChannelValidator();