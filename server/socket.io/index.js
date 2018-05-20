module.exports = (app) => {
  const _  = require('underscore');
  const io = require('socket.io')(app);
  const userList = {}

  io.on('connection', (socket) => {

    socket.on('setUID', (uid) => userList[uid] = socket.id);

    socket.on('sendFriendMsg', (toId, M_ID) => {
      let toSocket, id = userList[toId];

      if (toSocket = _.findWhere(io.sockets.sockets, { id })) toSocket.emit('receiveFriendMsg', M_ID);
    });

    socket.on('joinGroup', (gid) => socket.join(gid));

    socket.on('leaveGroup', (gid) => socket.leave(gid));

    socket.on('sendGroupMsg', (toId, UGM_ID) => socket.to(toId).emit('receiveGroupMsg', UGM_ID));

  });

}
