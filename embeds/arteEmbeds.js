'use strict';
const { EmbedBuilder } = require('discord.js');

function createGracesEmbed(arte) {
  return new EmbedBuilder()
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

function createXilliaEmbed(arte) {
  const embed = new EmbedBuilder()
    .setTitle(arte['Arte Name'])
    .setDescription(arte['Description'])
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