import { REST, Routes } from 'discord.js';
import { clientId, serverId, botToken } from './environment.js';
import fs from 'node:fs';

const helpObj = fs.readFileSync('./commands/help.cjs');  // load the JS module
const file = JSON.stringify(helpObj, null, 2);
console.log(file);

const commands = [file];

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
