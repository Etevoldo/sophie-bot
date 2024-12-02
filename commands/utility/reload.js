const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('DEV_ONLY: Reloads a command.')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The command to reload')
        .setRequired(true)),
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true)
      .toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply(`No comand with name ${commandName}`);
    }
    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try {
      const newCommand = require(`./${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(
        `Command \`${newCommand.data.name}\` was reloaded`
      );
    } catch (err) {
      console.error(err);
      await interaction.reply(
        'There was an error while reloading a command '
        + command.data.name + '\n'
        + err.messsage
      );
    }

  },
};