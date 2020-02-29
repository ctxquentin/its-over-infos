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
	if (message.content.startsWith("!infos") && message.channel.id == 666775624504967168) {
                let string = '';
                common.getGuildData()
                .then(data => {
                        client.channels.get('666775624504967168').send(data)
                });
        }
});

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

client.login(configz.token);