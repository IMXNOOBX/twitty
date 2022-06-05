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

        console.log(`Sending tweet... message: ${message} poll_duration: ${poll_duration} poll_options: ${poll_options}`);

        // client.twitter.tweet(client, message, { duration_minutes: poll_duration, options: poll_duration && poll_options ? { duration_minutes: poll_duration, options: poll_options_array } : null }).then(data => {
        client.twitter.tweet(client, message, { duration_minutes: poll_duration, options: poll_options_array }).then(data => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#FF5A5A')
                .setTitle(`Succesfully Sent Tweet`)
                .addField('Tweet', `*Tweet ID*: *\`${data.id}\`*\n*Tweet Text*: *\`${data.text}\`*\n*Tweet URL*: *[](https://twitter.com/IMXNOOBX/status/${data.id})*`)
                .setDescription(`**Invalid Username Or User ID**`)

            interaction.followUp({ embeds: [embed] })
        }).catch(error => {
            let embed = new client.discord.MessageEmbed()
                .setColor('#FF5A5A')
                .setTitle(`Error`)
                .setDescription(`**${error?.message}**`)

            interaction.followUp({ embeds: [embed] })
        })
    }
}

