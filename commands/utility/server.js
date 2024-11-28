const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the user'),
  async execute(interaction) {
    await interaction.reply(`This command was run by ${interaction.guild.name}, and has ${interaction.guild.memberCount} users.`);
  },
};