'use strict';
const {
  SlashCommandBuilder,
  SlashCommandStringOption,
  EmbedBuilder
} = require('discord.js');

// will move to its own file and import just graces
const gameOption = new SlashCommandStringOption()
  .setName('game')
  .setDescription('Select a game')
  .addChoices(
    { name: 'Graces', value: 'graces' },
    { name: 'Vesperia', value: 'vesperia' }
  )
  .setRequired(true);

const characterOption = new SlashCommandStringOption()
  .setName('character')
  .setDescription('Select a Character')
  .addChoices(
    { name: 'Asbel', value: 'asbel' },
    { name: 'Sophie', value: 'kidnamedflower' }
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

// soon to be moved, just for testing
const charaArtes = {
  'asbel': {
    'demon fang': {
      'description': 'altered arte removed in the PlayStation 3 version; the level 5 mastery skill is replaced with a mastery skill for Demon Fist',
      'CC cost': '2',
      'JP name': '魔神剣 (Majinken)',
      'Enemy Attributes': 'Inorganic, Fiend',
      'Damage Type': 'Slash'
    },
    'demon fist': {},
    'void sword': {}
  },
  'kidnamedflower': {
    'eagle dive': {},
    'lucent palisade': {}
  },
};


async function autocomplete(interaction) {
  const charaValue = interaction.options.getString('character', true);
  const choices = Object.keys(charaArtes[charaValue]);
  const focused = interaction.options.getFocused().toLowerCase();
  const filtered = choices.filter(choice => choice.startsWith(focused));
  await interaction.respond(
    filtered.map(choice => ({ name : choice, value: choice }))
  );
}

async function execute(interaction) {
  const gameValue = interaction.options.getString('game', true);
  const charaValue = interaction.options.getString('character', true);
  const arteValue = interaction.options.getString('arte', true);

  if (!charaArtes[charaValue][arteValue]) {
    interaction.reply(`You selected ${gameValue} ${charaValue} ${arteValue}`);
    return;
  }

  const fetchedarte = charaArtes[charaValue][arteValue];

  let embed = new EmbedBuilder();
  embed.setTitle(arteValue)
  embed.setDescription(arte['description'])
  embed.addFields(
    { name: 'CC cost', value: arte['CC cost'], inline: true },
    { name: 'JP name', value: arte['JP name'], inline: true },
    { name: 'Enemy Attributes', value: arte['Enemy Attributes'], inline: true },
    { name: 'Damage Type', value: arte['Damage Type'], inline: true },
  );

  await interaction.reply({ embeds: [embed] });
}

module.exports = { data, autocomplete, category, execute };