import { Message } from "discord.js";

export class Commands {
    whichCmd: string;
    message: Message;
    constructor(cmd : string, msg : Message){
        this.whichCmd = cmd;
        this.message = msg;
        this.assigningCommand(msg);
        
    }

    assigningCommand(msg : Message){
        if(msg.content.startsWith('!marcel') && msg.content.split(' ')[1] == 'help') this.help();
    }

    help(){
        let string = '';
        string += '**!marcel actu :** Donnes les 20 dernières actualités de la guilde. ( Réservé a la gestion. Elles sont également postés tout les jours a minuit )' + '\n\n';
        string += '**!marcel classes :** Donne le nombre total de chaque classe joué par les membres de la guilde. ( Réservé a la gestion. ) ' + '\n\n';
        string += '**!check pseudo_compte :** Donne un lien vers le profil Ankama ' + '\n\n';
        string += '**!catfact :** Donne un Aldafact aléatoire.' + '\n\n';
        string += '**!meme :** Donne un meme aléatoire.' + '\n\n';
        string += '**!pika :** Pika Pikachuuuuuu !!' + '\n\n';
        this.message.channel.send(string);
    }

};