const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    GuildId: String,
    UserId: String,
    UserMessages: Number
});

module.exports = mongoose.model("messagesSchema", messageSchema);