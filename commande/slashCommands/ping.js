const config = require("../../config");

module.exports = {
  data: {
    description: "🏓 View the ping of the bot.",
    descriptionLocalizations: {
      fr: "🏓 Afficher le ping du bot."
    }
  },

  async exe(client, interaction) {
    interaction.reply({
      fr: {
        embeds: [{
          title: "🏓 Ping",
          description: `Latence du bot: \`${interaction.createdTimestamp}ms\`\nLatence du Websocket: \`${client.ws.ping}ms\``,
          color: 0xFFFF00
        }]
      }
    }[interaction.locale] || {
      embeds: [{
        title: `🏓 Ping`,
        description: `Bot latency: \`${interaction.createdTimestamp}ms\`\nWebsocket latency: \`${client.ws.ping}ms\``,
        color: 0xFFFF00
      }]
    }
    )
  }
}