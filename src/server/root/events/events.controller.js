const Base = require('../../../infrastructure/base');
const socketService = require('../../socket/socket.service');

class EventsController extends Base {

    publishEvent(req, res, next) {
        let eventWrapper = req.body;
        this.logger.info('[EventsController] Received event: ', eventWrapper);

        let status = socketService.processEvent(eventWrapper);
        this.logger.info('[EventsController] Delivered event with status:', status);
        if (status.success) {
            res.json({
                message: status.message,
                uuid: status.uuid
            });
        } else {
            res.status(400);
            res.json({
                message: status.message
            })
        }
    }
}

module.exports = new EventsController();