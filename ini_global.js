const parser = require("node-html-parser");
const axios = require('axios');
const configz = require('./configz/constants');

const urlGuild = configz.urlGuild;


let getGuildData = async function(){
    try{
        const response = axios.get(urlGuild);
        let data = await response;
        let final_data = parseActu(data);
        return final_data;
    }catch(error){
        console.error(error);
    }
}

let getCatFact = async function(){
    try{
        const response = axios.get('https://some-random-api.ml/facts/cat');
        let data = await response;
        return data;
    }catch(error){
        console.log(error);
    }
}

let parseActu = function(html){
    const root = parser.parse(html.data);
    const actus =  root.querySelectorAll('.ak-actions-list .ak-title');
    let string = '';
    actus.forEach(element => {
        string += strip(element.toString()).trim() + '\n';
    });
    return string;
}

let strip = function(s){
        
    return s.replace(/<[^>]*>?/gm, '');
    
}

exports.getGuildData = getGuildData;

exports.getCatFact = getCatFact;