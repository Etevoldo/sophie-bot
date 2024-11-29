const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provides information about the user or server')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about user')
        .addUserOption(option =>
          option
            .setName('target')
            .setDescription('The user to get info')
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Info about the server')
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target');

      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
      } else {
        await interaction.reply(
          `Username: ${interaction.user.username}\nID: ${interaction.user.id}`
        );
      }
    } else if (interaction.options.getSubcommand() === 'server') {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: `
        + interaction.guild.memberCount
      );
    }
  },
};