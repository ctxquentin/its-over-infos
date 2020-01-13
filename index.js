const Discord = require('discord.js');
const client = new Discord.Client();
const common = require('./ini_global');
const configz = require('./configz/constants');

let contentArray = [];
let pages;
async function listActu(page){
        let tmp_array = []; 
        for(let z = 1; z <= page; z++){
                let html = await common.getHtmlActu('https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-guildes/1868100222-over?actions-page='+z);
                html.forEach(function(element){
                        tmp_array.push(common.strip(element));
                })
        }


        return tmp_array;
        
}

async function getPages(){
        let pagesAmount = await common.getActuPageAmount();
        let pages = await pagesAmount.trim();
        return pages;
}

function parseResult(data, nb_actu){
        let string = '\n';
        if(nb_actu >= 40){
                string += 'Vous ne pouvez pas retourner plus de 40 actualités';
                return string;
        }else if(nb_actu == undefined){
                nb_actu = 39;
        }
        for(let r = 0; r < nb_actu; r++){
                string += common.strip(data[r]) + '\n';
        }
        return string;
}


client.once('ready', () => {
        console.log('It\'s Over informations are loaded !');
});

client.on('message', message => {
	if (message.content.startsWith("!infos") && message.channel.id == 665552681334603816) {
                if(message.content.split(" ")[1] == 'actu'){
                        getPages().then(data => {
                                listActu(data).then(daata => {
                                        message.reply(parseResult(daata, message.content.split(" ")[2]))
                                })
                        });

                }else if(message.content.split(" ")[1] == 'help'){
                        let string;
                        string += 'Récuperer les actualités de la guilde ( 40 dernières) : !list actu' + '\n'; 
                        string += 'Récuperer un nombre d\'actualités de la guilde ( 40 max ) : !list actu [nombre d\'actu]' + '\n';
                        message.reply(string); 
                } 
	}
});

client.login(configz.token);