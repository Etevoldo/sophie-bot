'use strict';
const { Events } = require('discord.js');

function execute(client) {
  console.log(`Logged in as ${client.user.tag}`);
};

module.exports = { name: Events.ClientReady, once: true, execute };