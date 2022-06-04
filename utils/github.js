module.exports = function(client) {
	const app = client.express()
	app.use(client.express.json())
	app.use(client.github);
	// app.use(client.express.urlencoded({ extended: true }))

	webhookHandler.on('*', function (event, repo, data) {
		for(var i; i < client.config.github.events.length; i++){
			if(client.config.github.events[i].name === event){
				client.log.console(`[Github] | ${event} event has been triggered`);
			}
		}
	});
};