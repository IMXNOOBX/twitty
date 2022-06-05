module.exports = {
    name: 'pingo',
    description: 'Check bots ping',
    developer: true,
    run: async (client, interaction) => {
        interaction.followUp({ content: client.ws.ping + 'ms', ephemeral: true })
    }
}


/*  https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    https://autocode.com/tools/discord/command-builder/
NAME	                VALUE
SUB_COMMAND	                1
SUB_COMMAND_GROUP	        2
STRING	                    3
INTEGER	                    4
BOOLEAN	                    5
USER	                    6
CHANNEL	                    7
ROLE	                    8

----------------------------------------------------------------
    https://discordjs.guide/interactions/replying-to-slash-commands.html#command-options
get those values

const string = interaction.options.getString('input');
const integer = interaction.options.getInteger('int');
const number = interaction.options.getNumber('num');
const boolean = interaction.options.getBoolean('choice');
const user = interaction.options.getUser('target');
const member = interaction.options.getMember('target');
const channel = interaction.options.getChannel('destination');
const role = interaction.options.getRole('muted');
const mentionable = interaction.options.getMentionable('mentionable');

client.log.console([string, integer, boolean, user, member, channel, role, mentionable]);

*/