const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    description: "✏️ Customize the emoji.",
    descriptionLocalizations: {
      fr: "✏️ Personnalise l'emoji."
    }
  },

  async exe(client, interaction) {

    if (!interaction.member.permissions.has("Administrator")) {
      interaction.reply({
        fr: {
          embeds: [{
            author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
            description: `Vous avez pas les permissions requises. \`(Administrator)\``,
            footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
            color: 0xFFFF00
          }],
          ephemeral: true
        }
      }[interaction.locale] || {
        embeds: [{
          author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
          description: `You do not have the required permissions. \`(Administrator)\``,
          footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
          color: 0xFFFF00
        }],
        ephemeral: true
      }
      )
    }

    interaction.reply({
      fr: {
        embeds: [{
          title: "🆕 Personnalise l'emoji",
          description: `Quand une publicité sera envoyée, si la pub et **validé** par votre équipe, alors le bot mettra une réaction sous les messages.`,
          footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
          color: 0xFFFF00
        }],
        ephemeral: true,
        components: [
          {
            type: 1,
            components: [
              {
                type: 3,
                custom_id: "menu",
                options: [
                  {
                    label: "<- Emoji 1",
                    value: "emoji1",
                    emoji: "1️⃣"
                  },
                  {
                    label: "<- Emoji 2",
                    value: "emoji2",
                    emoji: "✏️"
                  }
                ],
                placeholder: "Clique pour personnaliser."
              }
            ]
          }
        ]
      }
    }[interaction.locale] || {
      embeds: [{
        title: `🆕 Customize the emoji`,
        description: `When an advertisement is sent, if the advertisement is **validated** by your team, then the bot will put a reaction under the messages.`,
        footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
        color: 0xFFFF00
      }],
      ephemeral: true,
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "menu",
              options: [
                {
                  label: "<- Emoji 1",
                  value: "emoji1",
                  emoji: "1️⃣"
                },
                {
                  label: "<- Emoji 2",
                  value: "emoji2",
                  emoji: "✏️"
                }
              ],
              placeholder: "Click to customize."
            }
          ]
        }
      ]
    }
    )
  }
}