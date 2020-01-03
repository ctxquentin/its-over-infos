const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');
const configz = require('./configz/constants');




client.once('ready', () => {
	console.log('Ping Pong Bot Loaded!');
});

client.on('message', message => {
	if (message.content.startsWith("!list")) {
                if(message.content.split(" ")[1] == 'actu'){
                        async function callGetHTML(){
                                let html = await common.getHTML();
                                let msg = '';
                                let i = 0;
                                html.some(element => {
                                        i++;
                                        msg += element + '\n';
                                        if(message.content.split(" ")[2]) return !isNaN(message.content.split(" ")[2]) && message.content.split(" ")[2] == i;
                                        
                                });
                                return message.reply(msg.replace(/<[^>]*>?/gm, ''));
                        }
                        callGetHTML();
                };
		
        }
});

client.login(configz.token);