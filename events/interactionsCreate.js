'use strict';
const { Events, Collection } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

async function execute(interaction) {
  if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found`
      );
      return;
    }
    try {
      await command.autocomplete(interaction);
    } catch (err) {
      console.error(err);
    }
  }
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }

  const { cooldowns } = interaction.client;

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const defaultCooldownDuration = 3;
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimeStamp = Math.round(expirationTime / 1000);
      await interaction.reply({
        content: 'Please wait, you are on a cooldown for '
          + command.data.name
          + '. You can use it again '
          + `<t:${expiredTimeStamp}:R>`,
        ephemeral: true
      });
      await wait(cooldownAmount);
      await interaction.deleteReply();
      return;
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'Error while executing this command!',
        ephemeral: true,
      });
    }
  }
};

module.exports = { name: Events.InteractionCreate, execute };