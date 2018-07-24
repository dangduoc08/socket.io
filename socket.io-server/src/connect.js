const mongoose = require("mongoose");

function getUrl() {
    if (process.env.NODE_ENV === "production") return "mongodb://root:root2008@ds147361.mlab.com:47361/socketio-production";
    else if (process.env.NODE_ENV === "test") return "mongodb://localhost/socketio-test";
    return "mongodb://localhost/socketio-dev";
}

mongoose.connect (getUrl(), () => console.log("Database connected!"))