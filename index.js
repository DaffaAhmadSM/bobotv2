//import discord.js
const Discord = require('discord.js');
const {Collection, GatewayIntentBits, Partials, Client} = require('discord.js');
const {user, Message, GuildMember, ThreadMember, Channel} = Partials

require('dotenv').config();
const token = process.env.TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [user, Message, GuildMember, ThreadMember, Channel],
});
const {loadEvents} = require('./Handlers/eventHandler');
const { loadCommands } = require("./Handlers/commandHandler");

client.commands = new Collection();


client.login(token).then(() => {
  loadEvents(client);
  loadCommands(client);
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });