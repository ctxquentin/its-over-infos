import { Message, ReactionCollector, User, ReactionEmoji, MessageReaction, Client, TextChannel, GuildMember, DiscordAPIError, Snowflake } from "discord.js";
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
                    break;
                case 'crerVote' : 
                    this.crerVote(msg.content.replace("!marcel crerVote", ""));
                    break;
                case 'finirVote': 
                    this.finirVote();
                    break;
                default:
                    break;
            }
        }
    }

    embedVote(contenu : string){
        const embed = {
            "title": contenu,
            "color": 14688292,
            "author": {
              "name": 'Vote crée par : '+this.message.author.username,
            },
            "fields": [
              {
                "name": "✅",
                "value": "Oui",
                "inline": true
              },
              {
                "name": "❌",
                "value": "Non \n\n",
                "inline": true
              }
            ]
          };
          this.message.channel.send({ embed }).then(message =>{
            this.gererVote(message);
          });
    }

    crerVote(contenu : string){
        if (this.message.channel.type === 'dm') return;
        const channel : TextChannel = this.message.channel;
        if (contenu === ""){
            channel.send("crerVote ne s'utilise pas comme ca, !marcel help pour plus d'information");
            return;
        }
        this.embedVote(contenu);
    }

    gererVote (message :Message) {
        if (message.channel.type === 'dm') return;
        const channel : TextChannel = message.channel;
        channel.members.each(guildMember => {if(!guildMember.user.bot)guildMember.roles.add('688471685162074222');});
        message.react('✅');
        message.react('❌');
        const filter = (reaction:MessageReaction, user:User) => (reaction.emoji.name === '✅'|| reaction.emoji.name === '❌') && !user.bot;
        const collector = message.createReactionCollector(filter, {dispose: true});
        collector.on('remove', (r,user) => {
            message.guild?.member(user)?.roles.add('688471685162074222');
            message.guild?.member(user)?.roles.remove('688471714644230188');
        });
        collector.on('collect', (r,user) => {
            message.guild?.member(user)?.roles.add('688471714644230188');
            message.guild?.member(user)?.roles.remove('688471685162074222');
        });

    }

    finirVote(){
        if (this.message.channel.type === 'dm') return;
        const channel : TextChannel = this.message.channel;
        channel.members.each(guildMember => guildMember.roles.remove('688471685162074222'));
        channel.members.each(guildMember => guildMember.roles.remove('688471714644230188'));
        this.message.react('✅');
    }

    // Send a message of the commands with a short explanation
    help(){
        const embed = {
          "title": "Voici la liste des commandes que vous pouvez utiliser:",
          "description": "Afin de pouvoir utilisez certaines commandes commencer par utiliser !marcel config_init",
          "color": 16666191,
          "footer": {},
          "fields": [
            {
              "name": "```!marcel config_init [lien page de guilde] [identifiant canal]```",
              "value": "Permet de définir la page de quel sur la quelle le bot doit récupérer les informations, et sur quel canal il doit les afficher."
            },
            {
              "name": "```(Réservé à la gestion) !marcel actu ```",
              "value": "Donnes les 20 dernières actualités de la guilde. Elles sont également postés tout les jours a minuit"
            },
            {
              "name": "```(Réservé à la gestion) !marcel classes (optional classes)```",
              "value": "Donne le nombre total de chaque classe joué par les membres de la guilde."
            },
            {
              "name": "```!marcel check [pseudo compte]```",
              "value": "Donne un lien vers le profil Ankama."
            },
            {
              "name": "```!marcel creerVote [un titre]```",
              "value": "Créer un message de vote avec un titre, donne le grade doit voter à toutes les personnes ayant accès à ce canal, enlève le grade et donne a voté quand un utilisateur vote."
            },
            {
              "name": "```!marcel finVote```",
              "value": "Retire les grades doit voter et a voté."
            },
            {
              "name": "```!catfact```",
              "value": "Donne un Aldafact aléatoire.",
              "inline": true
            },
            {
              "name": "```!pika```",
              "value": "Pika Pikachuuuuuu !!",
              "inline": true
            },
            {
              "name": "```!meme```",
              "value": "Donne un meme aléatoire.",
              "inline": true
            }
          ]
        };
        this.message.channel.send({ embed });
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

};