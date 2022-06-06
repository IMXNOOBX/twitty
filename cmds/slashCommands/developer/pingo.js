module.exports = {
    name: 'pingo',
    description: 'Check bots ping',
    developer: true,
    run: async (client, interaction) => {
        interaction.followUp({ content: client.ws.ping + 'ms', ephemeral: true })
    }
}