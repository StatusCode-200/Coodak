module.exports = (io) => {
  io.on("connect", (socket) => {

    console.log("new connection", socket.id);

    // handle the event sent with socket.send()
    socket.on("message", (data) => {
      console.log(data);
    });

    // handle the event sent with socket.emit()
    socket.on("salutations", (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });

    // handle the event sent with socket.emit()
    socket.on("disconnect", (elem1, elem2, elem3) => {
      console.log("connection disconnected", socket.id);
    });

  });
};
