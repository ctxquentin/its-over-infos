const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');
const configz = require('./configz/constants');
var fs = require('fs');

let rawdata = fs.readFileSync('./configz/server_config.json');
let configs = JSON.parse(rawdata);

client.once('ready', () => {
        console.log('Bot loaded');

        if(process.argv[2] == 'cron'){
                console.log('cron executed');
                common.getGuildData()
                .then(data => {
                        client.channels.get('666775624504967168').send(data);
                        setTimeout(function(){
                                process.exit();
                        }, 5000);
                });
        }                     
});

client.on('message', async message => {
        if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'config_init'){
                configs.configs[message.guild.id] = {};
                configs.configs[message.guild.id]['url_actu'] = message.content.split(' ')[2];
                configs.configs[message.guild.id]['url_membres'] = message.content.split(' ')[2] + '/membres/';
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
                        client.channels.get(configs.configs[message.guild.id]['gestion_channel']).send(data)
                });
        }
});

client.on('message', message => {
        if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'classes' && message.channel.id == configs.configs[message.guild.id]['gestion_channel']) {
                common.getGuildClassPages(configs.configs[message.guild.id]['url_membres']).then(data => {
                        common.getGuildClass(data, configs.configs[message.guild.id]['url_membres']).then(d => {
                                client.channels.get(configs.configs[message.guild.id]['gestion_channel']).send(d);
                        })

                });
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
                string += '**!catfact :** Donne un Aldafact aléatoire.' + '\n\n';
                string += '**!pika :** Pika Pikachuuuuuu !!' + '\n\n';
                message.channel.send(string);
        }
})

client.login(configz.token);