// NOTE: it is recommended that the names contain only [a..z] chars due to usage as socket.io namespaces
let channelNames = {
    application: 'application',
    message: 'message',
    user: 'user'
};

Object.freeze(channelNames);

module.exports = channelNames;