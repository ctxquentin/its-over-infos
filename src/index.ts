import { Bot } from './bot';
import { config } from 'dotenv';


config();

if(typeof(process.env.DISCORD_TOKEN) == 'string'){
    const bot = new Bot(process.env.DISCORD_TOKEN);
    bot.listen();
}

