const ChannelBase = require('../channel.base');
const channelNames = require('../channel.names');
const usersRepo = require('../../../../repo/users.repo');

class UserChannel extends ChannelBase {

    constructor(io) {
        super(io, channelNames.user);
        this.channel.on('connection', (socket) => {
            let userName = socket.handshake.query.userName;
            usersRepo.connect(userName);
            socket.on('disconnect', () => {
                usersRepo.disconnect(userName);
            });
        });
    }
}

module.exports = UserChannel;