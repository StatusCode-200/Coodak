module.exports = (io) => {
  io.on("connect", (socket) => {

    console.log("new connection", socket.id);

    socket.on("join", (roomId) => {
      console.log("join", roomId);
      socket.join(roomId);
    });

    socket.on("code", ({ projectId, code }) => {
      socket.to(projectId).broadcast.emit("code", code);
    });

    socket.on("disconnect", () => {
      console.log("connection disconnected", socket.id);
    });

  });
};
