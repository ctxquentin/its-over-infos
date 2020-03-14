
import { Message, Client } from 'discord.js'; 
import { config } from 'dotenv';
import fs = require('fs');



config();
const client: Client = new Client();

let rawdata = fs.readFileSync('dist/server_config.json');

let configs = JSON.parse(rawdata.toString());

client.on('ready', () => { 
    console.log( 'Bot loaded' );
 })

client.on('message', async (message : Message)  => {
    
    if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'config_init'){
            if(message.guild !== null){
                configs.configs[message.guild.id] = {};
                configs.configs[message.guild.id]['url_actu'] = message.content.split(' ')[2];
                configs.configs[message.guild.id]['url_membres'] = message.content.split(' ')[2] + '/membres';
                configs.configs[message.guild.id]['gestion_channel'] = message.content.split(' ')[3];
                const json = JSON.stringify(configs);
                fs.writeFile('./configz/server_config.json', json , (err) => {
                        if(err){
                                console.log('error')
                        }
                });
            }

        

    }
})

client.on('message', ( message : Message ) => {
    if(message.content !== null && message.channel !== null && message.content.startsWith('!marcel') && message.content.split(' ')[1] == 'help'){
            let string = '';
            string += '**!marcel actu :** Donnes les 20 dernières actualités de la guilde. ( Réservé a la gestion. Elles sont également postés tout les jours a minuit )' + '\n\n';
            string += '**!marcel classes :** Donne le nombre total de chaque classe joué par les membres de la guilde. ( Réservé a la gestion. ) ' + '\n\n';
            string += '**!check pseudo_compte :** Donne un lien vers le profil Ankama ' + '\n\n';
            string += '**!catfact :** Donne un Aldafact aléatoire.' + '\n\n';
            string += '**!meme :** Donne un meme aléatoire.' + '\n\n';
            string += '**!pika :** Pika Pikachuuuuuu !!' + '\n\n';
            message.channel.send(string);
    }
})

client.login(process.env.DISCORD_TOKEN);