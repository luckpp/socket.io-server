const Base = require('../../../infrastructure/base');
const channelValidator = require('../channels/channel.validator');
const Status = require('../status');

class EventValidator extends Base {

    validateWrapper(eventWrapper) {

        let channelId = eventWrapper.channelId;
        let event = eventWrapper.event;

        if (!channelValidator.isValid(channelId)) {
            return new Status(false, `Invalid channel [${channelId}]`);
        }

        return new Status(true, 'Message is valid');
    }
}

module.exports = new EventValidator();