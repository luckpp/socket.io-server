const Base = require('../../../../infrastructure/base');
const usersRepo = require('../../../../repo/users.repo');

class UsersController extends Base {
    
    getUsers(req, res, next) {
        res.json(usersRepo.getUsers());
    }
}

module.exports = new UsersController();