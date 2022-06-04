module.exports = function(client) {
	const app = client.express()
	app.use(client.express.json())
	// app.use(client.express.urlencoded({ extended: true }))

	app.post('/github/webhook', async (req, res) => {
		console.log(req.body)
		res.status(200)//.send('ok')	
	})

	app.listen(80, () => {
		client.log.console('[Server] | listening on port 80')
	})	
};