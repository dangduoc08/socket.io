// Modules
const express = require('express');
const app = express();
const server = require('http').Server(app);
const parser = require('body-parser');
const cors = require('cors');
// global socket.io
global.io = require('socket.io')(server);
require ('./socket.io.events')();
// Routers
const { userView } = require('./views/user.view');
const { messageView } = require('./views/message.view')

// Middlewares
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(express.static('src/assets'));
app.use(cors());

// Use router
app.use('/user', userView);
app.use('/message', messageView);

module.exports = { server }