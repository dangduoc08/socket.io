const { server } = require("./app");
require("./connect.js");

server.listen(process.env.PORT || 2008, () => console.log("Server started!"))