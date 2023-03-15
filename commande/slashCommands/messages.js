const config = require("../../config");
const messagesSchema = require("../../models/messagesSchema");

module.exports = {
  data: {
    description: "📨 Messages send to the server.",
    descriptionLocalizations: {
      fr: "📨 Messages envoyer sur le serveur."
    }
  },

  async exe(client, interaction) {
    const messages = await messagesSchema.findOne({
      GuildId: interaction.guild.id,
    });

    interaction.reply({
      fr: {
        embeds: [{
          author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
          description: `Vous avez envoyer \`${messages.UserMessages}\` message(s) sur ce serveur.`,
          footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
          color: 0xFFFF00
        }]
      }
    }[interaction.locale] || {
      embeds: [{
        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
        description: `You sent \`${messages.UserMessages}\` message(s) on this server.`,
        footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
        color: 0xFFFF00
      }]
    }
    )
  }
}