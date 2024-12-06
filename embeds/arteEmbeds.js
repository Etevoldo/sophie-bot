'use strict';
const { EmbedBuilder } = require('discord.js');

function createGracesEmbed(arte, charaValue) {
  const thumbnails = {
    'kidnamedflower': 'https://static.wikia.nocookie.net/aselia/images/6/69/Sophie_Artes_Portrait.jpg'
  };

  const embed = new EmbedBuilder()
    .setColor(0x367bac)
    .setThumbnail(thumbnails[charaValue])
    .setTitle(arte['Arte Name'])
    .setDescription(arte['Description'] ?? ' ');

  if (arte['Casting Time (seconds)']) {
    embed.addFields({
      name: 'Casting Time (seconds)',
      value: arte['Casting Time (seconds)'],
      inline: true,
    });
  }
  if (arte['CC Cost']) {
    embed.addFields({
      name: 'CC Cost',
      value: arte['CC Cost'],
      inline: true,
    });
  }
  if (arte['Enabled Effects']) {
    embed.addFields({
      name: 'Enabled Effects',
      value: arte['Enabled Effects'],
      inline: true,
    });
  }
  embed.addFields(
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
    }
  );
  if (arte['Mastery']) {
    embed.addFields({
      name: 'Mastery Titles',
      value: 'Adept: ' + (arte['Mastery'][0]) + ' uses\n' +
        'Master: ' + (arte['Mastery'][1]) + ' uses',
      inline: true
    });
  }
  if (arte['Title Acquisition[Wii/PS3]']) {
    embed.addFields({
      name: 'Title Acquisition[Wii/PS3]',
      value: arte['Title Acquisition[Wii/PS3]'],
      inline: true
    });
  }
  if (arte['Mastery Skill Effect']) {
    embed.addFields({
      name: 'Mastery Skill Effect',
      value: arte['Mastery Skill Effect'],
      inline: true
    });
  }
  if (arte['Requirements']) {
    embed.addFields({
      name: 'Requirements',
      value: arte['Requirements'],
      inline: true
    });
  }
  return embed;
}

function createXilliaEmbed(arte, charaValue) {
  const thumbnails = {
    'jude': 'https://static.wikia.nocookie.net/aselia/images/2/2d/Jude_Artes_Portrait_%281%29.jpg',
    'milla': 'https://static.wikia.nocookie.net/aselia/images/3/3e/Milla_Artes_Portrait_%281%29.jpg',
    'alvin': 'https://static.wikia.nocookie.net/aselia/images/7/76/Alvin_Artes_Portrait_%281%29.jpg',
    'elize': 'https://static.wikia.nocookie.net/aselia/images/8/8a/Elize_Artes_Portrait_%281%29.jpg',
    'rowen': 'https://static.wikia.nocookie.net/aselia/images/b/b6/Rowen_Artes_Portrait_%281%29.jpg',
    'leia': 'https://static.wikia.nocookie.net/aselia/images/1/12/Leia_Artes_Portrait_%281%29.jpg',
  };

  const embed = new EmbedBuilder()
    .setColor(0x00a180)
    .setTitle(arte['Arte Name'])
    .setDescription(arte['Description'])
    .setThumbnail(thumbnails[charaValue])
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