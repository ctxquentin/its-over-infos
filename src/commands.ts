import { Message, ReactionCollector, User, ReactionEmoji, MessageReaction, Client, TextChannel, GuildMember, DiscordAPIError } from "discord.js";
import { userInfo } from "os";

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
        if(msg.content.startsWith('!marcel') && msg.content.split(' ')[1] == 'crerVote') this.crerVote();
        if(msg.content.startsWith('!marcel') && msg.content.split(' ')[1] == 'finirVote') this.finirVote();
    }

    // nom provisioire
    crerVote(){
        if (this.message.channel.type === 'dm') return;
        const channel : TextChannel = this.message.channel;
        channel.members.each(guildMember => {if(!guildMember.user.bot)guildMember.roles.add('688471685162074222');});
        this.message.react('✅');
        this.message.react('❌');
        const filter = (reaction:MessageReaction, user:User) => (reaction.emoji.name === '✅'|| reaction.emoji.name === '❌') && !user.bot;
        const collector = this.message.createReactionCollector(filter, {dispose: true});
        collector.on('remove', (r,user) => {
            this.message.guild?.member(user)?.roles.add('688471685162074222');
            this.message.guild?.member(user)?.roles.remove('688471714644230188');
        });
        collector.on('collect', (r,user) => {
            this.message.guild?.member(user)?.roles.add('688471714644230188');
            this.message.guild?.member(user)?.roles.remove('688471685162074222');
        });

    }

    finirVote(){
        if (this.message.channel.type === 'dm') return;
        const channel : TextChannel = this.message.channel;
        channel.members.each(guildMember => guildMember.roles.remove('688471685162074222'));
        channel.members.each(guildMember => guildMember.roles.remove('688471714644230188'));
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