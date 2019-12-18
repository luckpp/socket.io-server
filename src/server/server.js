const express = require('express');
const Base = require('../infrastructure/base');
const serverConfig = require('../config/config').server;
const standardMiddleware = require('./middleware/standardMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const rootRouter = require('./root/root.router');
const socketService = require('./socket/socket.service');

class Server extends Base {

    constructor() {
        super();
        this.logger.info(`[${process.pid}] Server created`);
    }

    async start() {
        let app = express();

        standardMiddleware.attachTo(app);
        app.use('/', rootRouter.create());
        errorMiddleware.attachTo(app);
        
        await this.startListening(app);

        this.app = app;
    }

    startListening(app) {
        return new Promise((resolve, reject) => {
            if (serverConfig && serverConfig.port) {
                let server = app.listen(serverConfig.port);
                server.on('error', (err) => {
                    this.logger.info(`Could not start server: ${err}`);
                    reject(err);
                });
                server.on('listening', () => {
                    this.logger.info(`[${process.pid}] Server started on http://localhost:${serverConfig.port}`);
                    resolve();
                });

                socketService.startListening(server);
            } else {
                reject(new Error(`serverConfig is not properly defined: ${JSON.stringify(serverConfig)}`));
            }
        });
    }
}

module.exports = Server;