const config = require("../../config");

module.exports = {
  data: {
    description: "📬 Add an advertising channel.",
    descriptionLocalizations: {
      fr: "📬 Ajouter un salon publicitaire."
    },
    options: [
      {
          type: 7,
          name: "add",
          description: "➕ Select an advertising channel.",
          descriptionLocalizations: {
            fr: "➕ Séléctionner un salon publicitaire."
          },
      }
  ]
  },

  async exe(client, interaction) {
    interaction.reply({
      fr: {
        embeds: [{
          title: "<:info:1071521506573701120> Toujours en développement.",
          description: `\`cheraph#6290\` seforce a amélioré <@${client.user.id}> chaque jour pour vous proposer des nouveautés !\n**Rejoignez le [serveur support](${config.support}) pour être informer des actualités.**`,
          color: 0xFFFF00
        }]
      }
    }[interaction.locale] || {
      embeds: [{
        title: `<:info:1071521506573701120> Still in development.`,
        description: `\`cheraph#6290\` seforce has improved <@${client.user.id}> every day to bring you new features!\n**Join the [support server](${config.support}) to be informed of new news.**`,
        color: 0xFFFF00
      }]
    }
    )
  }
}