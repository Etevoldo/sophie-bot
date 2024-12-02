'use strict';
const {
  SlashCommandBuilder,
  SlashCommandStringOption,
} = require('discord.js');
const { graces } = require('../../jsons/graces.js');
const { xillia } = require('../../jsons/xillia.js');
const arteEmbeds = require('../../embeds/arteEmbeds.js');

// will move to its own file and import just graces
const gameOption = new SlashCommandStringOption()
  .setName('game')
  .setDescription('Select a game')
  .addChoices(
    { name: 'Graces', value: 'graces' },
    { name: 'Xillia', value: 'xillia' },
  )
  .setRequired(true);

const characterOption = new SlashCommandStringOption()
  .setName('character')
  .setDescription('Select a Character')
  .addChoices(
    { name: 'Asbel', value: 'asbel' },
    { name: 'Sophie', value: 'kidnamedflower' },
    { name: 'Jude', value: 'jude' }
  )
  .setRequired(true);

const arteOption = new SlashCommandStringOption()
  .setName('arte')
  .setDescription('Select an arte')
  .setRequired(true)
  .setAutocomplete(true);

const data = new SlashCommandBuilder()
  .setName('arte')
  .setDescription('Get arte information')
  .addStringOption(gameOption)
  .addStringOption(characterOption)
  .addStringOption(arteOption);

async function autocomplete(interaction) {
  // only 25 options to autocomplete
  const BASE_TYPE_MAX_LENGTH = 25;
  const charaValue = interaction.options.getString('character', true);
  const gameValue = interaction.options.getString('game', true);

  let choices = [];
  if (gameValue === 'graces') {
    choices = Object.keys(graces[charaValue]);
  }
  else if (gameValue === 'xillia') {
    choices = Object.keys(xillia[charaValue]);
  }
  const focused = interaction.options.getFocused().toLowerCase();
  const filtered = choices.filter(choice => choice.startsWith(focused));
  const filteredReduced = filtered.splice(0, BASE_TYPE_MAX_LENGTH);
  await interaction.respond(
    filteredReduced.map(choice => ({ name : choice, value: choice }))
  );
}

async function execute(interaction) {
  const gameValue = interaction.options.getString('game', true);
  const charaValue = interaction.options.getString('character', true);
  const arteValue = interaction.options.getString('arte', true);

  let embed;
  if (gameValue === 'graces' && graces[charaValue][arteValue]) {
    const arte = graces[charaValue][arteValue];
    embed = arteEmbeds.createGracesEmbed(arte);
  } else if (gameValue === 'xillia' && xillia[charaValue][arteValue]) {
    const arte = xillia[charaValue][arteValue];
    embed = arteEmbeds.createXilliaEmbed(arte);
  } else {
    interaction.reply(
      `You options are invalid, maybe you chose the wrong character or game?`);
    return;
  }

  return await interaction.reply({ embeds: [embed] });
}

module.exports = { data, autocomplete, execute };