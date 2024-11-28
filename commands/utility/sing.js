'use strict';

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sing')
    .setDescription('Ask Sophie to sing a song 🎵'),
  async execute(interaction) {
    await interaction.reply('https://youtube.com/clip/UgkxeHXUmpejmNd5fQcdGkdTc1hZpdHPHxvN?si=JoWjOOvlilO339kO');
  },
};