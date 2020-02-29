const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');
const configz = require('./configz/constants');

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

client.on('message', message => {
	if (message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'actu' && message.channel.id == 666775624504967168) {
                let string = '';
                common.getGuildData()
                .then(data => {
                        client.channels.get('666775624504967168').send(data)
                });
        }
});

client.on('message', message => {
        if(message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'classes' && message.channel.id == 666775624504967168) {
                common.getGuildClassPages().then(data => {
                        common.getGuildClass(data).then(d => {
                                client.channels.get('666775624504967168').send(d);
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