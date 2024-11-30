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

const character = new SlashCommandStringOption()
  .setName('character')
  .setDescription('Select a Character')
  .addChoices(
    { name: 'Asbel', value: 'asbel' },
    { name: 'Sophie', value: 'kidnamedflower' }
  )
  .setRequired(true);

const arte = new SlashCommandStringOption()
  .setName('arte')
  .setDescription('Select an arte')
  .setRequired(true)
  .setAutocomplete(true);

const data = new SlashCommandBuilder()
  .setName('arte')
  .setDescription('Get arte information')
  .addStringOption(game)
  .addStringOption(character)
  .addStringOption(arte);

// soon to be moved, just for testing
const charaArtes = {
  'asbel': [
    'demon fang',
    'demon fist',
    'void sword',
  ],
  'kidnamedflower': [
    'eagle dive',
    'lucent palisade',
  ],
};

async function autocomplete(interaction) {
  const charaValue = interaction.options.getString('character', true);
  const choices = charaArtes[charaValue];
  const focused = interaction.options.getFocused();
  const filtered = choices.filter(choice => choice.startsWith(focused));
  await interaction.respond(
    filtered.map(choice => ({ name : choice, value: choice }))
  );
}

async function execute(interaction) {
  const gameValue = interaction.options.getString('game', true);
  const charaValue = interaction.options.getString('character', true);
  const arteValue = interaction.options.getString('arte', true);
  interaction.reply(
    `You selected ${gameValue} ${charaValue} ${arteValue}`
  );
}

const category = 'talesData'

module.exports = { data, autocomplete, category, execute };