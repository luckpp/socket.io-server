const Base = require('../infrastructure/base');

const userChannel = require('../server/socket/channels/user/user.channel');

class UsersRepository extends Base {

    constructor() {
        super();
        this.users = [];
    }

    getUsers() {
        return this.users;
    }

    connect(userName) {
        this.users.push({
            name: userName
        });
    }

    disconnect(userName) {
        let index = this.users.findIndex(user => user.name == userName);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
}

module.exports = new UsersRepository();