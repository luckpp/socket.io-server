const Base = require('../../../infrastructure/base');
const channelNames = require('./channel.names');

class ChannelFactory extends Base {

    constructor() {
        super();
        this.channelClasses = this.loadChannelClasses();
    }

    createChannels(io) {
        let result = {};
        let channelNames = Object.keys(this.channelClasses);
        for (const name of channelNames) {
            let channelClass = this.channelClasses[name];
            let channelObject = new channelClass(io);
            result[name] = channelObject;
        }
        return result;
    }

    loadChannelClasses() {
        let result = {};
        let channelNamesValues = Object.values(channelNames);

        for (const value of channelNamesValues) {
            result[value] = require(`./${value}/${value}.channel`);
        }
        return result;
    }
}

module.exports = new ChannelFactory();