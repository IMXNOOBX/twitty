module.exports = {
	name: 'actiontweet',
	description: 'Do an action on a tweet.',
	developer: true,
	options: [
		{
			name: "tweet",
			description: "Tweet ID, To perform the action on a tweet, you must provide the tweet ID.",
			type: 3,
			required: true
		},
		{
			name: "tweet_action",
			description: "Do an action on a tweet. Such as: like, dislike, retweet, unretweet, reply, delete.", // add edit when able
			type: 3,
			required: true
		},
		{
			name: "message",
			description: "If action is reply, input the message to reply with.",
			type: 3,
		}
	],
	run: async (client, interaction) => {
		let tweet_id = interaction.options.getString('tweet');
		let tweet_action = interaction.options.getString('tweet_action').toLowerCase();
		let message = interaction.options.getString('message');
		let actions = ['like', 'dislike', 'retweet', 'unretweet', 'reply', 'delete']
		
		if (!actions.includes(tweet_action)) { // add edit check when able
			let embed = new client.discord.MessageEmbed()
				.setColor('#FF5A5A')
				.setTitle(`Error`)
				.setDescription(`**Invalid Tweet Action**`)

			return interaction.followUp({ embeds: [embed] })
		}
		if ((tweet_action == 'reply'/* || tweet_action == 'edit'*/) && !message) { // add edit check when able
			let embed = new client.discord.MessageEmbed()
				.setColor('#FF5A5A')
				.setTitle(`Error`)
				.setDescription(`**Input a message to reply**`)

			return interaction.followUp({ embeds: [embed] })
		}
		client.twitter.tweetaction(client, tweet_id, tweet_action, message).then(data => {
			let embed = new client.discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Success`)
				.setDescription(`**Succesfully ${tweet_action}ed tweet ${tweet_id}**`)

			return interaction.followUp({ embeds: [embed] })
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

