const socket = require('socket.io');
const Base = require('../../infrastructure/base');
const eventValidator = require('./events/event.validator');
const Status = require('./status');
const channelFactory = require('./channels/channel.factory');
const usersRepo = require('../../repo/users.repo');

class SocketService extends Base {

    constructor() {
        super();
    }

    startListening(server) {
        let io = socket(server);
        this.attachMiddleware(io);
        this.attachEventHandlers(io);

        let channels = channelFactory.createChannels(io);

        this.io = io;
        this.channels = channels;
    }

    processEvent(eventWrapper) {
        let status = eventValidator.validateWrapper(eventWrapper);
        if (status.success) {
            status = this.emitEvent(eventWrapper);
        }
        return status;
    }

    // for internal use
    emitEvent(eventWrapper) {
        let channelName = eventWrapper.channelName;
        let event = eventWrapper.event;

        let channel = this.channels[channelName];
        if (!channel) {
            return new Status(false, `Unable to find channel [${channelName}]`);
        } 
        let status = channel.emitEvent(event);
        return status;
    }

    // for internal use
    attachMiddleware(io) {
        io.use((socket, next) => {
            let token = socket.handshake.query.token;
            this.logger.debug(`[SocketService] Verify token [${token}]`);
            if (token) { // TODO: make proper checks
                next();
            } else {
                next(new Error('authentication error'));
            }
        });
    }

    // for internal use
    attachEventHandlers(io) {
        io.on('connection', (socket) => {
            let userName = socket.handshake.query.userName;
            this.logger.debug(`[SocketService] Connected: ${userName}`);
            usersRepo.connect(userName);
            this.notifyUsers();
            socket.on('disconnect', () => {
                this.logger.debug(`[SocketService] Disconnected: ${userName}`);
                usersRepo.disconnect(userName);
                this.notifyUsers();
            });
        });
    }

    notifyUsers() {
        let users = usersRepo.getUsers();
        this.logger.debug(`[SocketService]  notifyUsers()`, users);
        let eventWrapper = {
            channelName: 'user',
            event: {
                uuid: 'test', //uuid(),
                name: 'usersChanged',
                payload: {
                    users: users
                }
            }
        };

        this.processEvent(eventWrapper);
    }
}

module.exports = new SocketService();