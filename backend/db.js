require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    connectThroughMongoose() {
        mongoose.connect(process.env.DB_CONN);

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error..."));
        db.once("open", function() {
            console.log("DB Connected Successfully!");
        });
    }
}