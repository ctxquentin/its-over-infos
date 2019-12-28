const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');




client.once('ready', () => {
	console.log('Ping Pong Bot Loaded!');
});

client.on('message', message => {
	if (message.content.startsWith("!list")) {
        if(message.content.split(" ")[1] == 'actu'){
        async function callGetHTML(){
                let html = await common.getHTML();
                let msg = '';
                html.forEach(element => {
                        msg += element + '\n';
                });
                return message.reply(msg.replace(/<[^>]*>?/gm, ''));
        }
        callGetHTML();
        };
		
	}
});

client.login('NjYwNDg5NTE0OTEyODQxNzYx.Xgdm8g.I_S7sn8pmt4kk_s_X2MxhdHnICs');