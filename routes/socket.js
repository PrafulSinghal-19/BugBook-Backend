let users = [];

const addUser = (userId, socketId,room) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId, room });
}

const removeUser = (socketId) => {
    const removedUser = users.filter(user => user.socketId === socketId);

    users = users.filter(user => user.socketId != socketId);

    if (removedUser.length === 0) return 0;
    else removedUser[0].room;
}

const getUsers = (room) => {
    const roomUsers = users.filter((user) => user.room === room);
    return roomUsers;
}

module.exports.sockets = (io) => {
    io.on("connection", (socket) => {
        io.emit("welcome", "hello this is socket")
        socket.on("addUser", (userId, room) => {
            socket.join(room);
            addUser(userId, socket.id,room)
            io.to(room).emit("getUsers", getUsers(room));
        });

        socket.on("sendMessage", ({userId, room, text}) => {
            socket.broadcast.to(room).emit("getMessage", {
                userId,
                text
            });
        });

        socket.on("disconnect", () => {
            const room = removeUser(socket.id);
            io.to(room).emit("getUsers", getUsers(room));
        });
    });
}