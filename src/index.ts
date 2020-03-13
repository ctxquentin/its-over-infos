import  {Client, Message, TextChannel } from 'discord.js';
import common = require('./ini_global');
import configz = require('./configz/constants.js');
var fs = require('fs');

let rawdata = fs.readFileSync('./configz/server_config.json');
let configs = JSON.parse(rawdata);
let client = new Client();
client.once('ready', () => {
        console.log('Bot loaded');          
});

client.on('message', async message => {
        if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'config_init'){
                configs.configs[message.guild.id] = {};
                configs.configs[message.guild.id]['url_actu'] = message.content.split(' ')[2];
                configs.configs[message.guild.id]['url_membres'] = message.content.split(' ')[2] + '/membres';
                configs.configs[message.guild.id]['gestion_channel'] = message.content.split(' ')[3];
                const json = JSON.stringify(configs);
                fs.writeFile('./configz/server_config.json', json , (err) => {
                        if(err){
                                console.log('erreur fdp')
                        }
                });
        }
})

client.on('message', message => {
	if (message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'actu' && message.channel.id == configs.configs[message.guild.id]['gestion_channel']) {
                let string = '';
                common.getGuildData(configs.configs[message.guild.id]['url_actu'])
                .then(data => {
                        let channel = client.channels.get(configs.configs[message.guild.id]['gestion_channel']) as TextChannel;
                        channel.send(data);
                });
        }
});

client.on('message', message => {
        if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'classes' && message.channel.id == configs.configs[message.guild.id]['gestion_channel']) {
                common.getGuildClassPages(configs.configs[message.guild.id]['url_membres']).then(data => {
                        common.getGuildClass(data, configs.configs[message.guild.id]['url_membres'], message.content.split(' ')[2]).then(d => {
                                let channel = client.channels.get(configs.configs[message.guild.id]['gestion_channel']) as TextChannel;
                                channel.send(d);
                        })
                });
        }
})

client.on('message', message => {
        if(message.content.startsWith('!check') && message.content.split(' ')[1].length > 0){
                message.channel.send('https://account.ankama.com/fr/profil-ankama/' + message.content.split(' ')[1] + '/dofus');
        }
})

client.on('message', message => {
        if (message.content.startsWith("!catfact")){
                common.getCatFact()
                .then(data => {
                        message.channel.send(data.data.fact);
                });
        }
})

client.on('message', message => {
        if (message.content.startsWith("!meme")){
                common.getMeme()
                .then(data => {
                        message.channel.send(data.data.image);
                });
        }
})

client.on('message', message => {
        if (message.content.startsWith("!pika")){
                common.getPikaPic()
                .then(data => {
                        message.channel.send(data.data.link);
                });
        }
})

client.on('message', message => {
        if(message.content.startsWith('!marcel') && message.content.split(' ')[1] == 'help'){
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

client.login(configz.token);
