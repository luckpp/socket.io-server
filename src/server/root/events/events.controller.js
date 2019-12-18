const Base = require('../../../infrastructure/base');
const socketService = require('../../socket/socket.service');

class EventsController extends Base {

    publishEvent(req, res, next) {
        let body = req.body;
        this.logger.info('[EventsController] received event: ', body);

        
        
        socketService.emitEvent('messenger', 'messenger-default-event', req.body);
        res.json({
            message: 'POST events.controller'
        });
    }
}

module.exports = new EventsController();