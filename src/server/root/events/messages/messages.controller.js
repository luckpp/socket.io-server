const Base = require('../../../../infrastructure/base');
const socketService = require('../../../socket/socket.service');

class MessagesController extends Base {

    publishEvent(req, res, next) {
        this.logger.info('Got event', req.body);
        socketService.emitEvent('messenger', 'messenger-default-event', req.body);
        res.json({
            message: 'POST messages.controller'
        });
    }
}

module.exports = new MessagesController();