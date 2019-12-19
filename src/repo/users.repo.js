const Base = require('../infrastructure/base');

class UsersRepository extends Base {

    constructor() {
        super();
        this.users = [];
    }

    getUsers() {
        return this.users;
    }

    connect(userName) {
        this.users.push(userName);
    }

    disconnect(userName) {
        let index = this.users.findIndex(u => u == userName);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
}

module.exports = new UsersRepository();