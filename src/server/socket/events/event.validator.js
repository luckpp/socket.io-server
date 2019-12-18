const Base = require('../../../infrastructure/base');
const channelValidator = require('../channels/channel.validator');
const Status = require('../status');

class EventValidator extends Base {

    validateWrapper(eventWrapper) {

        let channelName = eventWrapper.channelName;
        let event = eventWrapper.event;

        if (!channelValidator.isValid(channelName)) {
            return new Status(false, `Invalid channel [${channelName}]`);
        }

        return new Status(true, 'Message is valid');
    }
}

module.exports = new EventValidator();