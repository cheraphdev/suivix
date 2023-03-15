const version = require("../package.json");

module.exports = {
    bot: require("./bot.json"),
    db: require("./db.json"),
    channels: require("./channels.json"),
    colors: require("./colors.json"),
    emojis: require("./emojis.json"),
    roles: require("./roles.json"),
    webhooks: require("./webhooks.json"),
    support: "https://discord.gg/4CMFVSyqPB",
    docs: "https://docs.suivix.com/",
    status: `s?help | ${version.version} | @Suivix`,
    ownersId: [
        "1056780751133224990" // cheraph#6290
    ]
};