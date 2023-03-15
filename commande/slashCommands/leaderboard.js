const Discord = require("discord.js");
const config = require("../../config");
const messagesSchema = require("../../models/messagesSchema");

module.exports = {
  data: {
    description: "🏆 Show server leaderboard.",
    descriptionLocalizations: {
      fr: "🏆 Afficher le leaderboard du serveur."
    }
  },

  async exe(client, interaction) {
    const messages = await messagesSchema.find({
      GuildId: interaction.guild.id,
    }).sort({ UserMessages: -1 }).limit(10);

    const mappedData = messages
      .map((d, i) => `\`${i + 1}\` <@${d.UserId}> - messages: \`${d.UserMessages}\``)
      .join("\n");

    interaction.reply({
      fr: {
        embeds: [{
          author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
          description: mappedData.toString(),
          footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
          color: 0xFFFF00
        }]
      }
    }[interaction.locale] || {
      embeds: [{
        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
        description: mappedData.toString(),
        footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
        color: 0xFFFF00
      }]
    }
    )
  }
}