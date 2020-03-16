import axios, { AxiosResponse } from 'axios';
import { parse, HTMLElement, TextNode }  from "node-html-parser";

export class Data {

    async getGuildData(url : any){
        try{
            const response = axios.get(url);
            let data = await response;
            let final_data = this.parseActu(data.data);
            return final_data;
        }catch(error){
            console.error(error);
        }
    }

    async getCatFact (){
        try{
            const response = axios.get('https://some-random-api.ml/facts/cat');
            let data = await response;
            return data.data;
        }catch(error){
            console.log(error);
        }
    }

    async getMeme (){
        try{
            const response = axios.get('https://some-random-api.ml/meme');
            let data = await response;
            return data.data;
        }catch(error){
            console.log(error);
        }
    }

    async getPika (){
        try{
            const response = axios.get('https://some-random-api.ml/pikachuimg');
            let data = await response;
            return data.data;
        }catch(error){
            console.log(error);
        }
    }

    parseActu(html : string){
        const root : HTMLElement | TextNode  = parse(html);
        if(root instanceof HTMLElement){
            const actus =  root.querySelectorAll('.ak-actions-list .ak-title');
            let string = '';
            actus.forEach((element : HTMLElement) => {
                string += this.strip(element.toString()).trim() + '\n';
            });
            return string;
        }

    }

    strip(s : string){
        
        return s.replace(/<[^>]*>?/gm, '');
        
    }

}