import dotenv from 'dotenv';

dotenv.config();

export const botToken = process.env.DISCORD_TOKEN;
export const clientId = process.env.CLIENT_ID;
export const serverId = process.env.SERVER_ID;
