module.exports = {
    name: 'userinfo',
    description: 'get twitter user info',
    options: [
        {
            name: "user",
            description: "Input a user name/id to get info about him/her, you must provide the user name/ID.",
            type: 3,
            required: true
        },
    ],
    run: async (client, interaction) => {
        let user = interaction.options.getString('user');

        client.twitter.getUser(client, user).then(data => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${data.name}'s info`)
                .addField(`User V2 Result`, `*Twitter Name*: *\`${data.name}\`*\n*Username*: *\`${data.username}\`*\n*User ID*: *\`${data.id}\`*`)

            interaction.followUp({ embeds: [embed] })
        }).catch(error => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#FF5A5A')
                .setTitle(`Error`)
                .setDescription(`**Invalid Username Or User ID**`)

            interaction.followUp({ embeds: [embed] })
        })
    }
}

