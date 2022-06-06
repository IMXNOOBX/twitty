module.exports = {
    name: 'tweet',
    description: 'Tweet a tweet from discord.',
    options: [
        {
            name: "message",
            description: "Input a message to tweet, you must provide the message.",
            type: 3,
            required: true
        },
        {
            name: "poll_duration",
            description: "Input the ammount of minutes that the poll will be up!",
            type: 4,
            // required: true
        },
        {
            name: "poll_options",
            description: "Input the options for the poll! Separate them with a comma!",
            type: 3,
            // required: true
        },
    ],
    run: async (client, interaction) => {
        let message = interaction.options.getString('message');
        let poll_duration = interaction.options.getInteger('poll_duration');
        let poll_options = interaction.options.getString('poll_options');
        let poll_options_array = poll_duration && poll_options ? poll_options.split(',') : null;

        console.log(`Sending tweet... message: ${message} | poll_duration: ${poll_duration} | poll_options: ${poll_options}`);
        client.twitter.tweet(client, message, poll_duration && poll_options_array ? { duration_minutes: poll_duration, options: poll_options_array } : null).then(data => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Succesfully Sent Tweet`)
                .addField('Tweet', `***Tweet ID***: *\`${data.data.id}\`*\n***Tweet URL***: *[Click Here](https://twitter.com/${data.me.username}/status/${data.data.id})*`)
                .addField('Message', `*${data.data.text}*`)

            interaction.followUp({ embeds: [embed] })
        }).catch(error => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#FF5A5A')
                .setTitle(`Error`)
                .setDescription(`**Error while sending tweet.**`)
                .addField(`Debug Error`, `\`\`\`js\n${error?.message}\`\`\``)

            interaction.followUp({ embeds: [embed] })
        })
    }
}

