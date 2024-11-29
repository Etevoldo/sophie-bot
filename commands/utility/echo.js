const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with the message you put into')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('ephemeral')
        .setDescription('Want others to see it?')),
  async execute(interaction) {
    const input = interaction.options.getString('input', this);
    interaction.reply(input);
  },
};