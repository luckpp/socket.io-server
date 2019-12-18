const Base = require('../../../infrastructure/base');
const channelNames = require('./channel.names');

class ChannelValidator extends Base {

    constructor() {
        super();
        this.name = Object.values(channelNames); 
    }

    isValid(channelName) {
        return this.name
            && this.name.includes(channelName);
    }
}

module.exports = new ChannelValidator();