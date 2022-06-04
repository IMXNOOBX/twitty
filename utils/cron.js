module.exports = async function(client) {
	client.schedule.scheduleJob('0 * * * *', async function () {  // this for one hour: https://crontab.guru/every-1-hour
		client.log.console('[Cron] | 1 hour has passed');
	});
};