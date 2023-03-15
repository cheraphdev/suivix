const { WebhookClient } = require("discord.js");
const config = require("../config");

module.exports = {
    name: 'shardReady',
    once: true,
    async execute() {
        new WebhookClient(config.webhooks.shard).send({
            embeds: [{
                color: 0xFFFF00,
                description: (`${config.emojis.shardReady} Shard \`#0\` est prêt. (<t:${Math.floor(Date.now() / 1000)}:R>)`)
            }]
        })
    }
};