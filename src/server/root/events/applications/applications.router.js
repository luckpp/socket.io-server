const expressRouter = require('express').Router;
const applicationsController = require('./applications.controller');

class ApplicationsRouter {

    create() {
        let route = expressRouter();

        route.route('/:id')
            .post(applicationsController.publishEvent.bind(applicationsController));

        return route;
    }
}

module.exports = new ApplicationsRouter();