import { Client, Collection, GatewayIntentBits, Events, MessageFlags, PollLayoutType } from 'discord.js';
import { getJoinMessage } from '../messages/joinmessage.js';
import { botToken } from './environment.js';
import * as pollcommand from '../commands/poll.js';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessagePolls,
  ],
});

client.commands = new Collection();
client.commands.set('poll', pollcommand);

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(botToken);

// Member join
client.on(Events.GuildMemberAdd, (message) => {
  const user = message.user;

  try {
    client.channels.cache.get('1405534115545092186').send(getJoinMessage(user))
      .then(() => {
        console.log(`${message.user.username} joined the server!`);
      })
      .catch((error) => {
        console.log(`Error while sending user joined message: ${error}`);
      });
  } catch (error) {
    console.log(error, 'Error trying to send user join message');
  }

});

// handling commands
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) { return; }

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
    }
  }
});

//handling modal submission
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isModalSubmit()) { return; }

  if (interaction.customId === 'pollModal') {
    try {
      const pollOptions = [];
      const emojiOptions = ['🤖', '🛡️', '⚔️', '⚡', '🚀'];

      for (let x = 1; x <= 5; x = x + 1) {
        const option = interaction.fields.getTextInputValue(`gunpla${x}`).trim();
        if (option) {
          pollOptions.push({ text: option, emoji: emojiOptions[x - 1] });
        }
      }
      await interaction.reply({ poll: {
        question : { text: `${interaction.user.displayName} needs your help choosing what gundam to build next!` },
        answers: pollOptions,
        allowMultiselect: false,
        duration: 1,
        layoutType: PollLayoutType.Default,
      }, content: `<@${interaction.user.id}> created a poll!` });

      console.log(`${interaction.user.username} successfully created a poll!`);
    } catch (error) {
      console.log('Error while creating poll', error);
    }
  }
});
