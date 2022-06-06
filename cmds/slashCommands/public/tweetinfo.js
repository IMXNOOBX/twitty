module.exports = {
    name: 'tweetinfo',
    description: 'get information of a tweet',
    options: [
        {
            name: "tweet",
            description: "Input a tweet to lookup, you must provide the tweet ID.",
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        let tweet_id = interaction.options.getString('tweet');

        client.twitter.tweetinfo(client, tweet_id).then(data => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Tweet "${data.id}" info`)
                .addField(`Tweet V2 Lookup Result`, `*Tweet Message: *\`${data.text}\`*\n*Id*: *\`${data.id}\`*`)

            interaction.followUp({ embeds: [embed] })
        }).catch(error => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#FF5A5A')
                .setTitle(`Error`)
                .setDescription(`**Invalid Tweet**`)
                .addField(`Debug Error`, `\`\`\`js\n${error?.message}\`\`\``)

            interaction.followUp({ embeds: [embed] })
        })
    }
}

