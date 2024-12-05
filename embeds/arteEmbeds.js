'use strict';
const { EmbedBuilder } = require('discord.js');

function createGracesEmbed(arte) {
  return new EmbedBuilder()
    .setColor(0x367bac)
    .setTitle(arte['Arte Name'])
    .setDescription(arte['Notes'])
    .addFields(
      { name: 'JP Name', value: arte['JP Name'], inline: true },
      { name: 'CC Cost', value: arte['CC Cost'], inline: true },
      { name: 'Enabled Effects', value: arte['Enabled Effects'], inline: true },
      {
        name: 'Enemy Attributes',
        value: arte['Enemy Attributes'],
        inline: true
      },
      { name: 'Damage Type', value: arte['Damage Type'], inline: true },
      { name: 'Max Hits', value: arte['Max Hits'], inline: true },
      {
        name: 'Total Damage (%)',
        value: arte['Total Damage (%)'],
        inline: true
      },
      {
        name: 'Damage Multiplier (per hit)',
        value: arte['Damage Multiplier (per hit)'],
        inline: true
      },
      {
        name: 'Mastery',
        value: `Adept: ${arte['Mastery'][0]}\nMaster: ${arte['Mastery'][1]}`,
        inline: true
      },
    );
}

function createXilliaEmbed(arte, charaValue) {
  function getThumb(character) {
    switch (character) {
    case 'jude': return 'https://static.wikia.nocookie.net/aselia/images/2/2d/Jude_Artes_Portrait_%281%29.jpg';
    case 'milla': return 'https://static.wikia.nocookie.net/aselia/images/3/3e/Milla_Artes_Portrait_%281%29.jpg';
    case 'alvin': return 'https://static.wikia.nocookie.net/aselia/images/7/76/Alvin_Artes_Portrait_%281%29.jpg';
    case 'elize': return 'https://static.wikia.nocookie.net/aselia/images/8/8a/Elize_Artes_Portrait_%281%29.jpg';
    case 'rowen': return 'https://static.wikia.nocookie.net/aselia/images/b/b6/Rowen_Artes_Portrait_%281%29.jpg';
    case 'leia': return 'https://static.wikia.nocookie.net/aselia/images/1/12/Leia_Artes_Portrait_%281%29.jpg';
    }
  }

  const embed = new EmbedBuilder()
    .setColor(0x00a180)
    .setTitle(arte['Arte Name'])
    .setDescription(arte['Description'])
    .setThumbnail(getThumb(charaValue))
    .addFields(
      {
        name: 'Enabled Effects',
        value: arte['Enabled Effects'] ?? '-',
        inline: true
      },
      {
        name: 'Elemental Attributes',
        value: arte['Elemental Attributes'] ?? '-',
        inline: true
      },
      {
        name: 'Sub-Status Attributes',
        value: arte['Sub-Status Attributes'] ?? '-',
        inline: true
      },
      {
        name: 'Damage Effect',
        value: arte['Damage Effect'] ?? '-',
        inline: true
      },
      {
        name: 'Damage Spread',
        value: arte['Damage Spread'] ?? '-',
        inline: true
      },
      { name: 'Max Hits', value: arte['Max Hits'], inline: true },
      {
        name: 'Total Damage (%)',
        value: arte['Total Damage (%)'],
        inline: true
      },
      {
        name: 'TP Cost',
        value: arte['TP Cost'] ?? '-',
        inline: true
      },
      {
        name: 'Requirements',
        value: arte['Requirements'] ?? '-',
      },
    );
  if (arte['Casting Time (seconds)']) {
    embed.addFields({
      name: 'Casting Time (seconds)',
      value: arte['Casting Time (seconds)']
    });
  }
  return embed;
}

module.exports = { createGracesEmbed, createXilliaEmbed };