'use strict';
const {
  SlashCommandBuilder,
  SlashCommandStringOption,
} = require('discord.js');
const { graces } = require('../../jsons/graces.js');
const { xillia } = require('../../jsons/xillia.js');
const arteEmbeds = require('../../embeds/arteEmbeds.js');

const gamesArtes = new Map();
gamesArtes.set('graces', graces);
gamesArtes.set('xillia', xillia);

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
  .setRequired(true)
  .setAutocomplete(true);

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
  const focused = interaction.options.getFocused('true');

  let choices;

  const gameValue = interaction.options.getString('game', true);
  if (focused.name === 'character') {
    choices = Object.keys(gamesArtes.get(gameValue)) ?? [];
  }
  else if (focused.name === 'arte') {
    const charaValue = interaction.options.getString('character', true);
    choices = Object.keys(gamesArtes.get(gameValue)[charaValue] ?? {});
  } else {
    choices = [];
  }

  // TODO: if no game[character] property is found, default with empty array
  const filtered = choices.filter(choice => choice.startsWith(focused.value));
  const filteredReduced = filtered.splice(0, BASE_TYPE_MAX_LENGTH);
  await interaction.respond(
    filteredReduced.map(choice => ({ name : choice, value: choice }))
  );
}

async function execute(interaction) {
  const gameValue = interaction.options.getString('game', true);
  const charaValue = interaction.options.getString('character', true);
  const arteValue = interaction.options.getString('arte', true);

  const gameArtesList = gamesArtes.get(gameValue) ?? {};

  if (!isValidQuery(gameArtesList, charaValue, arteValue)) {
    return await interaction.reply(
      'You options are invalid, maybe you chose the wrong character or game?');
  }

  const arte = gameArtesList[charaValue][arteValue];

  let embed;
  switch (gameValue) {
  case 'graces': embed = arteEmbeds.createGracesEmbed(arte); break;
  case 'xillia': embed = arteEmbeds.createXilliaEmbed(arte); break;
  }

  return await interaction.reply({ embeds: [embed] });
}

// helper function to see if character/arte exists because annoying
// typeerrors with no trivial solution
function isValidQuery(arteList, charaValue, arteValue) {
  if (!arteList[charaValue]) return false;
  if (!arteList[charaValue][arteValue]) return false;
  return true;
}

module.exports = { data, autocomplete, execute };