const config = require("../../config");
const path = require('path');

module.exports = {
    data: {
        description: "📢 Display the list of advertising rooms to configure.",
        descriptionLocalizations: {
            fr: "📢 Afficher la list des salon publicitaire configurer."
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

        const channels = require(path.resolve(path.join('./database/channelpub.json')));

        for (channel in channels[interaction.guild.id]) {
            allchannel = `> <#${channel}> | **ID**: ${channel}`;
        }

        interaction.reply({
            fr: {
                embeds: [{
                    title: "📢 Salon publicitaire",
                    description: allchannel,
                    footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }]
            }
        }[interaction.locale] || {
            embeds: [{
                title: `📢 Advertising fair`,
                description: allchannel,
                footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                color: 0xFFFF00
            }]
        }
        )
    }
}