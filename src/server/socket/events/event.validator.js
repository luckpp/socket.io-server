const Base = require('../../../infrastructure/base');
const Status = require('../status');
const channelNames = require('../channels/channel.names');

class EventValidator extends Base {

    constructor() {
        super();
        this.channelNames = Object.values(channelNames); 
    }

    validateWrapper(eventWrapper) {

        let channelName = eventWrapper.channelName;
        let event = eventWrapper.event;

        let status = this.validateChannelName(channelName);

        if (!status.success) {
            return status;
        }
        
        status = this.validateEvent(event);

        return status;
    }

    validateChannelName(channelName) {
        let isChannelNameValid =  this.channelNames && this.channelNames.includes(channelName);
        if (!isChannelNameValid) {
            return new Status(false, `Invalid channel name [${channelName}]`);
        }
        return new Status();
    }

    validateEvent(event) {
        let uuid = event.uuid;
        let name = event.name;
        let payload = event.payload;

        if (!uuid) {
            return new Status(false, `Invalid event.uuid [${uuid}]`);
        }

        if (!name) {
            return new Status(false, `Invalid event.name [${name}]`);
        }

        if (!payload) {
            return new Status(false, `Invalid event.payload [${payload}]`);
        }

        return new Status(true);
    }
}

module.exports = new EventValidator();