module.exports.run = async (error, client) => {
    client.log.error(`[Discord] | Unhandled Rejection Error: ${error}`);
}    