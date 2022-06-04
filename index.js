const { TwitterApi } = require('twitter-api-v2')
require('dotenv').config()
const Discord = require('discord.js');
const { Webhook } = require('dis-logs');
// Initialize Discord Client
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ],
});
// Initialize Twitter Client
const userClient = new TwitterApi({
	appKey: process.env.API_KEY,
	appSecret: process.env.API_SECRET_KEY,
	accessToken: process.env.ACCES_TOKEN,
	accessSecret: process.env.ACCES_SECRET,
});

const rwClient = userClient.readWrite;

// global imports
client.fs = require('fs');
client.config = require('./conf/config.json');
client.log = new Webhook(client.config.discord.utils.log_webhook);
// twitter
client.tclient = rwClient;
client.twitter = require('./utils/twitter.js');
// github
client.express = require("express");
client.server = require('./utils/github.js')(client);
// cron
client.schedule = require('node-schedule');
client.cron = require('./utils/cron.js')(client);
// discord
client.discord = Discord;
client.commands = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();

// Creating Command Handler Handler For Discord
var hands = ['hEvents', 'hSlash'];
hands.forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
    client.log.error('[Discord] | Login Error. Discord Response: ' + err);
});