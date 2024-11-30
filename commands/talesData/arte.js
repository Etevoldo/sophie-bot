'use strict';
const {
  SlashCommandBuilder,
  SlashCommandStringOption
} = require('discord.js');

// will move to its own file and import just graces
const game = new SlashCommandStringOption()
  .setName('game')
  .setDescription('Select a game')
  .addChoices(
    { name: 'Graces', value: 'graces' },
    { name: 'Vesperia', value: 'vesperia' }
  )
  .setRequired(true);

const arte = new SlashCommandStringOption()
  .setName('arte')
  .setDescription('Select a Character')
  .addChoices(
    { name: 'Demon Fang', value: 'demon_fang' },
    { name: 'Eagle Dive', value: 'eagle_dive' }
  )
  .setRequired(true);

const character = new SlashCommandStringOption()
  .setName('character')
  .setDescription('Select a Character')
  .addChoices(
    { name: 'Asbel', value: 'asbel' },
    { name: 'Sophie', value: 'kidNamedFlower' }
  )
  .setRequired(true);

const data = new SlashCommandBuilder()
  .setName('arte')
  .setDescription('Get arte information')
  .addStringOption(game)
  .addStringOption(character)
  .addStringOption(arte);

async function execute(interaction) {
  interaction.reply(
    `You selected ${interaction.options.getString('game', true)} `
    + `${interaction.options.getString('character', true)} `
    + `${interaction.options.getString('arte', true)}`
  );
}

module.exports = { data, execute };