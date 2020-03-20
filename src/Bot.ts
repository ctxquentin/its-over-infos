
import { Message, Client } from 'discord.js'; 
import { Commands } from './Commands';



export class Bot {
    client: Client;
    constructor(token : string){
        this.client = new Client();
        this.client.login(token);
    }

    listen() {
        this.client.on('message', async ( message : Message) => {
            if(message.content.startsWith('!marcel') || message.content.startsWith('!dak')){
                new Commands(message.content.split(' ')[1], message);
            }
        })

    }

}

