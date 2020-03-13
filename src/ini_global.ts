import  parser = require('node-html-parser');
import axios from 'axios';
import configz = require('./configz/constants');
const urlGuild = configz.urlGuild;
const urlMembers = configz.urlMembersGuilde;



export let getGuildData = async function(url){
    try{
        const response = axios.get(url);
        let data = await response;
        let final_data = parseActu(data);
        return final_data;
    }catch(error){
        console.error(error);
    }
}


export let getGuildClassPages = async function(url){
    try{
        const response = axios.get(url);
        let data = await response;
        let final_data = parseClassPages(data);
        return final_data;

    }catch(err){

        console.log(err);
    }
}

export let getGuildClass = async function(pages,url, classe){
    try{
        const classesAmount = { 
            "Ecaflip": 0, "Eniripsa": 0, "Iop": 0,"Cra": 0, "Feca": 0, "Sacrieur": 0,
            "Sadida": 0, "Osamodas": 0, "Enutrof": 0,"Sram": 0, "Xelor": 0, "Pandawa": 0,
            "Roublard": 0, "Zobal": 0, "Steamer": 0,"Eliotrope": 0, "Huppermage": 0, "Ouginak": 0
        };
        let n = 0;
        
        let arrayOfAllClasses = [];
        while(n < pages){
            n++;

            const res = axios.get(url+'?page='+n);
            const data = await res;
            let final_data = parseClass(data);
            arrayOfAllClasses = arrayOfAllClasses.concat(final_data);
        };

        arrayOfAllClasses.forEach(function(element){
            classesAmount[element]++;
        });
        let final_string = '';
        for( const amount in classesAmount){
            final_string += `${amount}: ${classesAmount[amount]} \n`;
        }
        if(classe !== undefined){
            final_string = 'Il y a ' + classesAmount[classe.charAt(0).toUpperCase() + classe.slice(1)] + ' ' + classe + ' dans la guilde.';
            if(classesAmount[classe.charAt(0).toUpperCase() + classe.slice(1)] == undefined) final_string = 'Nom de classe incorrecte'; 
        }
        return final_string;

    }catch(err){
        console.log(err)
    }
}

export let getCatFact = async function(){
    try{
        const response = axios.get('https://some-random-api.ml/facts/cat');
        let data = await response;
        return data;
    }catch(error){
        console.log(error);
    }
}

export let getMeme = async function(){
    try{
        const response = axios.get('https://some-random-api.ml/meme');
        let data = await response;
        return data;
    }catch(error){
        console.log(error);
    }
}

export let getPikaPic = async function(){
    try{
        const response = axios.get('https://some-random-api.ml/pikachuimg');
        let data = await response;
        return data;
    }catch(error){
        console.log(error);
    }
}

export let parseActu = function(html){
    const root  = parser.parse(html.data) as unknown as HTMLElement;
    const actus =  root.querySelectorAll('.ak-actions-list .ak-title');
    let string = '';
    actus.forEach(element => {
        string += strip(element.toString()).trim() + '\n';
    });
    return string;
}

export let parseClassPages = function(html){
    const root = parser.parse(html.data) as unknown as HTMLElement;
    const pagesLi = root.querySelectorAll('.ak-pagination .pagination li');
    const lastPageButt = pagesLi[pagesLi.length - 1].toString();
    const amountPages = lastPageButt.split('?page=')[1].charAt(0);
    return amountPages;
}

export let parseClass = function(html){
    const root = parser.parse(html.data) as unknown as HTMLElement;
    const icons = root.querySelectorAll('.ak-breed-icon');
    const listOfClass = [];
    icons.forEach(function(element : any){
        listOfClass.push(element.rawAttrs.split(' ')[2].split('"')[1] as string);
    })
    return listOfClass;
}

export let strip = function(s){
        
    return s.replace(/<[^>]*>?/gm, '');
    
}
