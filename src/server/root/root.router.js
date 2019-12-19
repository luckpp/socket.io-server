const expressRouter = require('express').Router;
const eventsRouter = require('./events/events.router');
const apiRouter = require('./api/api.router');

class RootRouter {

    create() {

        let route = expressRouter();

        route.use('/events', eventsRouter.create());
        route.use('/api', apiRouter.create());

        return route;
    }
}

module.exports = new RootRouter();