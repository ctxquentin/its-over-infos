const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');




client.once('ready', () => {
	console.log('Ping Pong Bot Loaded!');
});

client.on('message', message => {
    console.log(message.content.startsWith("!list"));
	if (message.content.startsWith("!list")) {
        if(message.content.split(" ")[1] == 'actu'){
                var html = common.getHTML();
    
        };
		
	}
});

client.login('NjYwNDg5NTE0OTEyODQxNzYx.Xgdm8g.I_S7sn8pmt4kk_s_X2MxhdHnICs');