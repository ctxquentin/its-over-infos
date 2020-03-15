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