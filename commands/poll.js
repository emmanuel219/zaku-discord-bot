import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder().setName('poll')
  .setDescription('Create a poll on what gunpla to build next.');

export const execute = async(interaction) => {
  const modal = new ModalBuilder().setCustomId('pollModal')
    .setTitle('Create a Poll');

  const gunpla1 = new TextInputBuilder()
    .setCustomId('gunpla1')
    .setLabel('Enter gundam number 1')
    .setStyle(TextInputStyle.Short);

  const gunpla2 = new TextInputBuilder()
    .setCustomId('gunpla2')
    .setLabel('Enter gundam number 2')
    .setStyle(TextInputStyle.Short);

  const gunpla3 = new TextInputBuilder()
    .setCustomId('gunpla3')
    .setLabel('(Optional) Enter gundam number 3')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  const gunpla4 = new TextInputBuilder()
    .setCustomId('gunpla4')
    .setLabel('(Optional) Enter gundam number 4')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  const gunpla5 = new TextInputBuilder()
    .setCustomId('gunpla5')
    .setLabel('(Optional) Enter gundam number 5')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  const firstActionRow = new ActionRowBuilder().addComponents(gunpla1);
  const secondActionRow = new ActionRowBuilder().addComponents(gunpla2);
  const thirdActionRow = new ActionRowBuilder().addComponents(gunpla3);
  const fourthActionRow = new ActionRowBuilder().addComponents(gunpla4);
  const fifthActionRow = new ActionRowBuilder().addComponents(gunpla5);

  modal.addComponents(firstActionRow).addComponents(secondActionRow)
    .addComponents(thirdActionRow)
    .addComponents(fourthActionRow)
    .addComponents(fifthActionRow);

  await interaction.showModal(modal);
};
