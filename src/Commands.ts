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
                case 'classes' :
                    this.getClasses(msg);
                    break;
                case 'creerVote' : 
                    this.creerVote(msg.content.replace("!marcel creerVote", ""));
                    break;
                case 'finirVote': 
                    this.finirVote();
                    break;
                case 'check' :
                    if(msg.content.split(' ')[1] == 'check') this.checkAccount(msg);
                    break;
                case 'catfact' :
                    this.getCatFact();
                    break;
                case 'meme' :
                    this.getMeme();
                    break;
                case 'pika' :
                    this.getPika();
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

    creerVote(contenu : string){
        if (this.message.channel.type === 'dm') return;
        const channel : TextChannel = this.message.channel;
        if (contenu === ""){
            channel.send("creerVote ne s'utilise pas comme ca, !marcel help pour plus d'information");
            return;
        }
        this.embedVote(contenu);
    }

    gererVote (message :Message) {
        if (message.channel.type === 'dm') return;
        if(message.guild === null) return;
        const doit_voter : string = this.config.configs[message.guild.id]['doit_voter'];
        const a_voter : string = this.config.configs[message.guild.id]['a_voter'];
        const channel : TextChannel = message.channel;
        // add role doit voter to everyone that have access to the channel
        channel.members.each(guildMember => {if(!guildMember.user.bot)guildMember.roles.add(doit_voter);});
        message.react('✅');
        message.react('❌');
        // Check that the reaction are ✅ or ❌ and the user is not a bot
        const filter = (reaction:MessageReaction, user:User) => (reaction.emoji.name === '✅'|| reaction.emoji.name === '❌') && !user.bot;
        const collector = message.createReactionCollector(filter, {dispose: true});
        // WHEN a user a reaction give him "doit_voter" and remove "a_voter"
        collector.on('remove', (r,user) => {
            message.guild?.member(user)?.roles.add(doit_voter);
            message.guild?.member(user)?.roles.remove(a_voter);
        });
        // WHEN a user ADD a reaction give him "a_voter" and remove "doit_voter"
        collector.on('collect', (r,user) => {
            message.guild?.member(user)?.roles.add(a_voter);
            message.guild?.member(user)?.roles.remove(doit_voter);
        });

    }
    

    finirVote(){
        if (this.message.channel.type === 'dm') return;
        if(this.message.guild === null) return;
        const channel : TextChannel = this.message.channel;
        const doit_voter : string = this.config.configs[this.message.guild.id]['doit_voter'];
        const a_voter : string = this.config.configs[this.message.guild.id]['a_voter'];
        channel.members.each(guildMember => guildMember.roles.remove(doit_voter));
        channel.members.each(guildMember => guildMember.roles.remove(a_voter));
        this.message.react('✅');
    }

    // Send a message of the commands with a short explanation
    help(){
        const embed = {
          "title": "Voici la liste des commandes que vous pouvez utiliser:",
          "description": "Afin de pouvoir utiliser certaines commandes, commencez par utiliser !marcel config_init.",
          "color": 16666191,
          "footer": {},
          "fields": [
            {
              "name": "```!marcel config_init [lien page de guilde] [identifiant canal] [identifiant role doit voter] [identifiant role a voter]```",
              "value": "Permet de définir la page sur laquelle le bot doit récupérer les informations, et sur quel canal il doit les afficher, ainsi que les identifiants des roles pour les votes."
            },
            {
              "name": "```(Réservé à la gestion) !marcel actu ```",
              "value": "Donne les 20 dernières actualités de la guilde. Elles sont également postés tout les jours a minuit."
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
              "value": "Créer un message de vote avec un titre, donne le grade doit voter à toutes les personnes ayant accès à ce canal, enlève le grade et donne le grade a voté quand un utilisateur vote."
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

    // Send a message returning a random cat fact
    getCatFact(){
        let data = new Data();
        if(this.message.guild !== null){
            data.getCatFact()
            .then(d => {
                this.message.channel.send(d.fact);
            })
        }
    }

    // Send a message returning a random meme
    getMeme(){
        let data = new Data();
        if(this.message.guild !== null){
            data.getMeme()
            .then(d => {
                this.message.channel.send(d.image);
            })
        }
    }

            // Send a message returning a random pikachu img
    getPika(){
        let data = new Data();
        if(this.message.guild !== null){
            data.getPika()
            .then(d => {
                this.message.channel.send(d.link);
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
            this.config.configs[message.guild.id]['doit_voter'] = message.content.split(' ')[4];
            this.config.configs[message.guild.id]['a_voter'] = message.content.split(' ')[5];
            fs.writeFile('./dist/server_config.json', JSON.stringify(this.config) , err => {
                    if(err){
                        console.log('erreur fdp');
                        message.react('❌');
                    } else {
                        message.react('✅');
                    }
            });
        }

    }

    checkAccount(message : Message){
        if(message.guild !== null && message.content.split(' ')[2].length > 0) message.channel.send('https://account.ankama.com/fr/profil-ankama/' + message.content.split(' ')[2] + '/dofus');
    }

    
    getClasses(message : Message){
        if(message.guild !== null){
            let dataParser = new Data();
            dataParser.getGuildClassPages(this.config.configs[message.guild.id]['url_membres']).then(data  => {
                if(message.guild !== null && typeof(data) == 'string'){
                    dataParser.getGuildClass(data, this.config.configs[message.guild.id]['url_membres'],message.content.split(' ')[2]).then(d => {
                        message.channel.send(d);
                    })
                }
                
            })
        }
    }

};