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

    async getGuildClass(pages : string, url : string, classe? : string){
        try{
            const classesAmount = { 
                "Ecaflip": 0, "Eniripsa": 0, "Iop": 0,"Cra": 0, "Feca": 0, "Sacrieur": 0,
                "Sadida": 0, "Osamodas": 0, "Enutrof": 0,"Sram": 0, "Xelor": 0, "Pandawa": 0,
                "Roublard": 0, "Zobal": 0, "Steamer": 0,"Eliotrope": 0, "Huppermage": 0, "Ouginak": 0
            };
            let n = 0;
            
            let arrayOfAllClasses : Array<string> = [];
            let p = parseInt(pages);
            while(n < p){
                n++;
    
                const res = axios.get(url+'?page='+n);
                const data = await res;
                let final_data = this.parseClass(data.data);
                if(final_data instanceof Array) arrayOfAllClasses = arrayOfAllClasses.concat(final_data);
                
            };
    
            arrayOfAllClasses.forEach(function(element : string){
                classesAmount[element as keyof typeof classesAmount]++
            });
            
            let final_string = '';
            for( const amount in classesAmount){
                final_string += `${amount}: ${classesAmount[amount as keyof typeof classesAmount]} \n`;
            }
            if(classe !== undefined){
                final_string = 'Il y a ' + classesAmount[classe.charAt(0).toUpperCase() + classe.slice(1) as keyof typeof classesAmount] + ' ' + classe + ' dans la guilde.';
                if(classesAmount[classe.charAt(0).toUpperCase() + classe.slice(1) as keyof typeof classesAmount] == undefined) final_string = 'Nom de classe incorrecte'; 
            }
            return final_string;
            
            
        }catch(err){
            console.log(err)
        }
    }

    parseClass(html : string){
        const root : HTMLElement | TextNode  = parse(html);
        if(root instanceof HTMLElement){
            const icons = root.querySelectorAll('.ak-breed-icon');
            const listOfClass : Array<string> = [];
            icons.forEach(function(element : HTMLElement){
                if(typeof(element.rawAttributes.title) == 'string') {
                    listOfClass.push(element.rawAttributes.title);
                }
            })
            return listOfClass;
        }
    }


    async getGuildClassPages(url : string){
        try{
            const response = axios.get(url);
            let data = await response;
            let final_data = this.parseClassPages(data.data);
            return final_data;
    
        }catch(err){
    
            console.log(err);
        }
    }

    parseClassPages(html : string){
        const root : HTMLElement | TextNode = parse(html);
        if(root instanceof HTMLElement){
            const pagesLi = root.querySelectorAll('.ak-pagination .pagination li');
            const lastPageButt = pagesLi[pagesLi.length - 1].toString();
            const amountPages = lastPageButt.split('?page=')[1].charAt(0);
            return amountPages;
        }
    }

    strip(s : string){
        
        return s.replace(/<[^>]*>?/gm, '');
        
    }

}