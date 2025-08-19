import { REST, Routes } from 'discord.js';
import { botToken, clientId, serverId } from './environment.js';
import * as pollcommand from '../commands/poll.js';

const commands = [];

commands.push(pollcommand.data.toJSON());
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(botToken);

// and deploy your commands!
(async() => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, serverId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
