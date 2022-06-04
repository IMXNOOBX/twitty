const { readdirSync } = require('fs')

module.exports = (client, log) => {

    const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let file of events) {

        try {
            let ev = require(`../events/${file}`);

            if (ev.event && typeof ev.event !== 'string') {
                continue;
            }

            ev.event = ev.event || file.replace('.js', '')
            client.on(ev.event, ev.run.bind(null, client))
        } catch (err) {
            client.log.error('[Discord] | Error While loading: ' + file + '\nDiscord Response: ' + err);
        }
    }
    client.log.console('[Discord] | Events Loaded Sucessfully!');
}