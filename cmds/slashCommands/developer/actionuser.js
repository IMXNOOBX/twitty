module.exports = {
	name: 'actionuser',
	description: 'Do an action on a user.',
	developer: true,
	options: [
		{
			name: "user",
			description: "User ID, To perform the action on a tweet, you must provide the user ID.",
			type: 3,
			required: true
		},
		{
			name: "user_action",
			description: "Do an action on a user. Such as: follow, unfollow, mute, unmute, block, unblock.", // add edit when able
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		let user = interaction.options.getString('user');
		let user_action = interaction.options.getString('user_action').toLowerCase();
		let actions = ['follow', 'unfollow', 'mute', 'unmute', 'block', 'unblock']

		if (!actions.includes(user_action)) { // add edit check when able
			let embed = new client.discord.MessageEmbed()
				.setColor('#FF5A5A')
				.setTitle(`Error`)
				.setDescription(`**Invalid User Action**`)

			return interaction.followUp({ embeds: [embed] })
		}

		client.twitter.useraction(client, user, user_action).then(data => {
			console.log(data)
			let embed = new client.discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Success`)
				.setDescription(`**Succesfully ${user_action}ed user ${user}**`)

			return interaction.followUp({ embeds: [embed] })
		}).catch(error => {
			console.log(error)
			let embed = new client.discord.MessageEmbed()
				.setColor('#FF5A5A')
				.setTitle(`Error`)
				.setDescription(`**Invalid User**`)

			interaction.followUp({ embeds: [embed] })
		})
	}
}

