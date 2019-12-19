const expressRouter = require('express').Router;
const Base = require('../../../infrastructure/base');
const eventsController = require('./events.controller');

class EventsRouter extends Base {

    create() {
        let route = expressRouter();

        route.route('/')
            .post(eventsController.publishEvent.bind(eventsController));

        return route;
    }
}

module.exports = new EventsRouter();