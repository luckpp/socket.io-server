const expressRouter = require('express').Router;
const messagesController = require('./messages.controller');

class MessagesRouter {

    create() {
        let route = expressRouter();

        route.route('/')
            .post(messagesController.publishEvent.bind(messagesController));

        return route;
    }
}

module.exports = new MessagesRouter();