const mongoose = require("mongoose");
const config = require("../config");

const guildSchema = new mongoose.Schema({
    GuildId: { type: String },
    Prefix: { type: String, default: config.bot.prefix },
    Premium: { type: Boolean, default: false },
    ReactionEmoji: { type: String, default: config.bot.reactemoji }

});

module.exports = mongoose.model("guildSchema", guildSchema);