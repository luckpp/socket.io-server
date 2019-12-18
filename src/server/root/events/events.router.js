const expressRouter = require('express').Router;
const eventsController = require('./events.controller');

class EventsRouter {

    create() {
        let route = expressRouter();

        route.route('/')
            .post(eventsController.publishEvent.bind(eventsController));

        return route;
    }

    get(req, res, next) {
        res.json({
            message: 'Hello Cioco-Sudoku'
        });
    }
}

module.exports = new EventsRouter();