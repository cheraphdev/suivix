const config = require("../../config");

module.exports = {
    data: {
        description: "🏠 Show bot help page.",
        descriptionLocalizations: {
            fr: "🏠 Afficher la page d'aide du bot."
        }
    },

    async exe(client, interaction) {
        interaction.reply({
            fr: {
                embeds: [{
                    author: { name: `${client.user.username} Page d'aide`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: `<@${client.user.id}> est un puissant bot Discord qui offre de nombreuses fonctionnalités telles que le suivi des publicités, le suivi des messages et plus encore.`,
                    fields: [
                        {
                            name: "<:Admins:1082765001737121923> Administration",
                            value: `\`s?add-channel\`, \`/add-channel\`, \`s?embed-panel\`, \`s?logs-channel\`, \`s?remove-channel\`, \`s?verif-channel\`, \`/auto-embed\`, \`/list-channel\`, \`/set-emoji\``
                        },
                        {
                            name: "<:general:1082765079524671579> Géneral",
                            value: `\`/leaderboard\`, \`/messages\`, \`/ping\``
                        }
                    ],
                    footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }]
            }
        }[interaction.locale] || {
            embeds: [{
                author: { name: `${client.user.username} Help page`, iconURL: `${client.user.displayAvatarURL()}` },
                description: `<@${client.user.id}> is a powerful Discord bot that offers many features such as ad tracking, message tracking and more.`,
                fields: [
                    {
                        name: "<:Admins:1082765001737121923> Administration",
                        value: `\`s?add-channel\`, \`/add-channel\`, \`s?embed-panel\`, \`s?logs-channel\`, \`s?remove-channel\`, \`s?verif-channel\`, \`/auto-embed\`, \`/list-channel\`, \`/set-emoji\``
                    },
                    {
                        name: "<:general:1082765079524671579> General",
                        value: `\`/leaderboard\`, \`/messages\`, \`/ping\``
                    }
                ],
                footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                color: 0xFFFF00
            }]
        }
        )
    }
}