const expressRouter = require('express').Router;
const eventsController = require('./events.controller');

class EventsRouter {

    create() {
        let route = expressRouter();

        route.route('/')
            .post(eventsController.publishEvent.bind(eventsController));

        return route;
    }
}

module.exports = new EventsRouter();