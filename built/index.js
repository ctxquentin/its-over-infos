"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var common = require("./ini_global");
var configz = require("./configz/constants.js");
var fs = require('fs');
var rawdata = fs.readFileSync('./configz/server_config.json');
var configs = JSON.parse(rawdata);
var client = new discord_js_1.Client();
client.once('ready', function () {
    console.log('Bot loaded');
});
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var json;
    return __generator(this, function (_a) {
        if (message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'config_init') {
            configs.configs[message.guild.id] = {};
            configs.configs[message.guild.id]['url_actu'] = message.content.split(' ')[2];
            configs.configs[message.guild.id]['url_membres'] = message.content.split(' ')[2] + '/membres';
            configs.configs[message.guild.id]['gestion_channel'] = message.content.split(' ')[3];
            json = JSON.stringify(configs);
            fs.writeFile('./configz/server_config.json', json, function (err) {
                if (err) {
                    console.log('erreur fdp');
                }
            });
        }
        return [2 /*return*/];
    });
}); });
client.on('message', function (message) {
    if (message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'actu' && message.channel.id == configs.configs[message.guild.id]['gestion_channel']) {
        var string = '';
        common.getGuildData(configs.configs[message.guild.id]['url_actu'])
            .then(function (data) {
            var channel = client.channels.get(configs.configs[message.guild.id]['gestion_channel']);
            channel.send(data);
        });
    }
});
client.on('message', function (message) {
    if (message.content.startsWith("!marcel") && message.content.split(' ')[1] == 'classes' && message.channel.id == configs.configs[message.guild.id]['gestion_channel']) {
        common.getGuildClassPages(configs.configs[message.guild.id]['url_membres']).then(function (data) {
            common.getGuildClass(data, configs.configs[message.guild.id]['url_membres'], message.content.split(' ')[2]).then(function (d) {
                var channel = client.channels.get(configs.configs[message.guild.id]['gestion_channel']);
                channel.send(d);
            });
        });
    }
});
client.on('message', function (message) {
    if (message.content.startsWith('!check') && message.content.split(' ')[1].length > 0) {
        message.channel.send('https://account.ankama.com/fr/profil-ankama/' + message.content.split(' ')[1] + '/dofus');
    }
});
client.on('message', function (message) {
    if (message.content.startsWith("!catfact")) {
        common.getCatFact()
            .then(function (data) {
            message.channel.send(data.data.fact);
        });
    }
});
client.on('message', function (message) {
    if (message.content.startsWith("!meme")) {
        common.getMeme()
            .then(function (data) {
            message.channel.send(data.data.image);
        });
    }
});
client.on('message', function (message) {
    if (message.content.startsWith("!pika")) {
        common.getPikaPic()
            .then(function (data) {
            message.channel.send(data.data.link);
        });
    }
});
client.on('message', function (message) {
    if (message.content.startsWith('!marcel') && message.content.split(' ')[1] == 'help') {
        var string = '';
        string += '**!marcel actu :** Donnes les 20 dernières actualités de la guilde. ( Réservé a la gestion. Elles sont également postés tout les jours a minuit )' + '\n\n';
        string += '**!marcel classes :** Donne le nombre total de chaque classe joué par les membres de la guilde. ( Réservé a la gestion. ) ' + '\n\n';
        string += '**!check pseudo_compte :** Donne un lien vers le profil Ankama ' + '\n\n';
        string += '**!catfact :** Donne un Aldafact aléatoire.' + '\n\n';
        string += '**!meme :** Donne un meme aléatoire.' + '\n\n';
        string += '**!pika :** Pika Pikachuuuuuu !!' + '\n\n';
        message.channel.send(string);
    }
});
client.login(configz.token);
