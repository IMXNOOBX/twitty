
class twitter {
	static async tweet(client, string, poll = null) {
		try {
			var me = await client.tclient.v2.me(), me = me.data
			var linebreak = ''
			string.split("\\n").forEach(lb => { // ik it's poor, but it works
				linebreak += '\n' + `${lb}`;
			})
			var data = await client.tclient.v2.tweet(linebreak, poll ? { poll: poll } : null);
			return { data: data?.data, me };
		} catch (err) {
			client.log.error(err);
		}
	}
	static async tweetaction(client, tweet, action, message) {
		try {
			var data
			var linebreak = ''
			if (message) {
				string.split("\\n").forEach(lb => {
					linebreak += '\n' + `${lb}`;
				})
			}
			var me = await client.tclient.v2.me(), me = me.data
			if (action == "like")
				data = await client.tclient.v2.like(me.id, tweet);
			else if (action == "dislike")
				data = await client.tclient.v2.unlike(me.id, tweet);
			else if (action == "retweet")
				data = await client.tclient.v2.retweet(me.id, tweet);
			else if (action == "unretweet")
				data = await client.tclient.v2.unretweet(me.id, tweet);
			else if (action == "reply")
				data = await client.tclient.v2.reply(linebreak, tweet);
			else if (action == "delete")
				data = await client.tclient.v2.deleteTweet(me.id, tweet);
			return data?.data;
		} catch (err) {
			client.log.error(err);
		}
	}
	static async tweetinfo(client, tweet) {
		try {
			let data = await client.tclient.v2.tweets([tweet]);
			return data?.data;
		} catch (err) {
			client.log.error(err);
		}
	}
	static async getUser(client, user) {
		try {
			var data;
			if (isNaN(user)) { // ima be honset, i didnt know that isNaN(user) stands for "is not a number"
				data = await client.tclient.v2.userByUsername(user);
			} else {
				data = await client.tclient.v2.user(user);
			}
			// var data2 = await client.tclient.v2.userLikedTweets(data.data.id);
			return data?.data;
		} catch (err) {
			client.log.error(err);
		}
	}
	static async useraction(client, user, action) {
		try {
			var data
			var me = await client.tclient.v2.me(), me = me.data
			user = await this.getUser(client, user);
			if (action == "follow") // credits: github copilot, xd
				data = await client.tclient.v2.follow(me.id, user.id); // me.id is my user id, user is the target
			else if (action == "unfollow")
				data = await client.tclient.v2.unfollow(me.id, user.id);
			else if (action == "mute")
				data = await client.tclient.v2.mute(me.id, user.id);
			else if (action == "unmute")
				data = await client.tclient.v2.unmute(me.id, user.id);
			else if (action == "block")
				data = await client.tclient.v2.block(me.id, user.id);
			else if (action == "unblock")
				data = await client.tclient.v2.unblock(me.id, user.id);

			return data?.data;
		} catch (err) {
			client.log.error(err);
		}
	}

};

module.exports = twitter;