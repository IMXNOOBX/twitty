module.exports.run = async (error, client) => {
    client.log.error(`[Discord] | Client's WebSocket Error: ${error}`);   
}    