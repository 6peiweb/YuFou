module.exports = (app) => {
  const _  = require('underscore');
  const io = require('socket.io')(app);
  const socketList = { user: {}, group: {} }

  io.on('connection', (socket) => {

    socket.on('setUID', (uid) => {
      socketList.user[uid] = socket.id;
    });

    socket.on('sendFriendMsg', (toId, M_ID) => {
      let toSocket,
          id = socketList.user[toId];

      if (toSocket = _.findWhere(io.sockets.sockets, { id })) {
        toSocket.emit('receiveFriendMsg', M_ID)
      }
    });
  });

}
