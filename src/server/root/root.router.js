const eventsRouter = require('./events/events.router');
const expressRouter = require('express').Router;

class RootRouter {

    create() {

        let route = expressRouter();

        route.use('/events', eventsRouter.create());

        return route;
    }
}

module.exports = new RootRouter();