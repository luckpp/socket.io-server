const Base = require('../../../../infrastructure/base');
const socketService = require('../../../socket/socket.service');

class UsersController extends Base {

    publishEvent(req, res, next) {
        this.logger.info('Got event', req.body);
        socketService.emitEvent('messenger', 'messenger-default-event', req.body);
        res.json({
            message: 'POST users.controller'
        });
    }
}

module.exports = new UsersController();