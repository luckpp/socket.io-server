const expressRouter = require('express').Router;
const usersController = require('./users.controller');

class UsersRouter {

    create() {
        let route = expressRouter();

        route.route('/:id')
            .post(usersController.publishEvent.bind(usersController));

        return route;
    }
}

module.exports = new UsersRouter();