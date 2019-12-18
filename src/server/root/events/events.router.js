const expressRouter = require('express').Router;
const eventsController = require('./events.controller');
const applicationsRouter = require('./applications/applications.router');
const messagesRouter = require('./messages/messages.router');
const usersRouter = require('./users/users.router');

class EventsRouter {

    create() {
        let route = expressRouter();

        route.route('/')
            .post(eventsController.publishEvent.bind(eventsController));

        route.use('/applications', applicationsRouter.create());
        route.use('/messages', messagesRouter.create());
        route.use('/users', usersRouter.create());

        return route;
    }
}

module.exports = new EventsRouter();