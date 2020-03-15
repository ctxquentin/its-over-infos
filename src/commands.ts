import { Message } from "discord.js";
import { Data } from './Data';
import * as configz from './server_config.json';
import fs = require('fs');

export class Commands {
    whichCmd: string;
    message: Message;
    config: any;
    constructor(cmd : string, msg : Message){
        this.config = configz;
        this.whichCmd = cmd;
        this.message = msg;
        this.assigningCommand(msg);        
    }

    // Depending on the content of the command, execute the appropriate function
    assigningCommand(msg : Message){
        if(msg.content.startsWith('!marcel')){
            switch(msg.content.split(' ')[1]){
                case 'help' :
                    this.help();
                    break;
                case 'actu' :
                    this.getActu(msg);
                    break;
                case 'config_init' :
                    this.configBot(msg);
                case 'check' :
                    if(msg.content.split(' ')[1] == 'check') this.checkAccount(msg);
                default:
                    break;
            }
        }
        

    }

    // Send a message of the commands with a short explanation
    help(){
        let string = '';
        string += '**!marcel actu :** Donnes les 20 dernières actualités de la guilde. ( Réservé a la gestion. Elles sont également postés tout les jours a minuit )' + '\n\n';
        string += '**!marcel classes :** Donne le nombre total de chaque classe joué par les membres de la guilde. ( Réservé a la gestion. ) ' + '\n\n';
        string += '**!marcel check pseudo_compte :** Donne un lien vers le profil Ankama ' + '\n\n';
        string += '**!catfact :** Donne un Aldafact aléatoire.' + '\n\n';
        string += '**!meme :** Donne un meme aléatoire.' + '\n\n';
        string += '**!pika :** Pika Pikachuuuuuu !!' + '\n\n';
        this.message.channel.send(string);
    }

    // Send a message returning the last news of the concerning guild
    getActu(message : Message){
        let data = new Data();
        if(this.message.guild !== null){
            data.getGuildData(this.config.configs[this.message.guild.id]['url_actu'])
            .then(d => {
                message.channel.send(d);
            })
            
        }
    }

    // Setting up the bot, including guild page url & the id of the management channel
    configBot(message : Message){
        if(message.guild !==null){
            this.config.configs[message.guild.id] = {};
            this.config.configs[message.guild.id]['url_actu'] = message.content.split(' ')[2];
            this.config.configs[message.guild.id]['url_membres'] = message.content.split(' ')[2] + '/membres';
            this.config.configs[message.guild.id]['gestion_channel'] = message.content.split(' ')[3];
            fs.writeFile('./dist/server_config.json', JSON.stringify(this.config) , err => {
                    if(err){
                            console.log('erreur fdp')
                    }
            });
        }

    }

    checkAccount(message : Message){
        if(message.guild !== null && message.content.split(' ')[2].length > 0) message.channel.send('https://account.ankama.com/fr/profil-ankama/' + message.content.split(' ')[2] + '/dofus');
    }

};