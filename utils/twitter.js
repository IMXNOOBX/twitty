
class twitter {
	static async tweet(client, string, media = null, poll = null) {
		try {
			var data;
			let mid = media ? await client.v1.uploadMedia(media) : null;
			// let data = await client.v2.tweet(string, { poll: poll, media_ids: mid});
			if (poll) {
				data = await client.tclient.v2.tweet('twitter-api-v2 is awesome!', { poll: poll }); //  poll: { duration_minutes: 120, options: ['Absolutely', 'For sure!'] }
			} else {
				data = await client.tclient.v2.tweet(string, {media_ids: mid});
			}
			return data;
		} catch (err) {
			client.log.error(err);
		}
	}
	static async getUser(client, user) {
		try {
			var data;
			if(isNaN(name)){
				data = await client.tclient.v2.user(user);
			} else {
				data = await client.v2.userByUsername(user);
			}
			return data;
		} catch (err) {
			client.log.error(err);
		}
	}

};

module.exports = twitter;