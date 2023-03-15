const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    GuildId: { type: String },
    UserId: { type: String},
    UserMessages: { type: Number, default: 0 }
});

module.exports = mongoose.model("messagesSchema", messageSchema);
