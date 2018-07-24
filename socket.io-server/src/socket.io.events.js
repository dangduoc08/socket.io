module.exports = webSocket = () => { 
    io.on('connection', socket => {
        // Server lắng nghe client gửi lên
        socket.on('Client-send-message', data => {
            // Server trả về client
            io.emit('Server-send-message', data)
        })
    })
}