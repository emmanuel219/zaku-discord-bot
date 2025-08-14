import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import { getJoinMessage } from './joinmessage.js';
import { botToken } from './environment.js';
import help from '../commands/help.cjs';
import path from 'path';
import fs from 'fs';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
client.commands.set('help', help);

/*const commandFolder = 'commands';
const commandFiles = fs.readdirSync(commandFolder);

for (const file of commandFiles){
  const command = require(path.join(commandFolder, file));
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    console.log(client.commads);
  } else {
    console.log('[WARNING] The command at is missing a required "data" or "execute" property.');
  }
}*/

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

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) { return; }
  console.log(interaction);
});

/*client.on(Events.GuildMemberAdd, (message) => {
    console.log(message);
    if(message.author != client.user){
            message.channel.send(getJoinMessage())
        .then((res) => {
        console.log('User join message sent successfully!');
    }).catch((error) => {
        console.log('Error sending user join message', error);
    });
    }
})*/
