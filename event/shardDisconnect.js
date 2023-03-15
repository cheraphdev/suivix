const { WebhookClient } = require("discord.js");
const config = require("../config");

module.exports = {
    name: 'shardDisconnect',
    once: true,
    async execute() {
        new WebhookClient(config.webhooks.shard).send({
            embeds: [{
                color: 0xFFFF00,
                description: (`${config.emojis.shardDisconnect} Shard \`#0\` s'est déconnecté ! (<t:${Math.floor(Date.now() / 1000)}:R>)`)
            }]
        })
    }
};