const cheerio = require("cheerio");
const parser = require("node-html-parser");
const axios = require('axios');


module.exports = { 
/*
    getHTML : async () =>  request('https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-guildes/1868100222-over',  function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const ito = parser.parse(html);
            var actus = ito.querySelectorAll('.ak-title');
            const html = await actus[0].toString();
            return html;
        }
    }),
*/

    getHtmlActu: async (url) => {
      try {
          const response = await axios.get(url);
          const ito = parser.parse(response.data);
          const actus = ito.querySelectorAll('.ak-actions-list .ak-title');
          const actionsArray = [];
          actus.forEach(element => {
              actionsArray.push(element.toString())
          });
          const htmls = await actionsArray;
          return htmls;
      } catch (e) {
          console.log(e);
          return  '';
      }
    },
    getActuPageAmount: async () => {
        try {
            const response = await axios.get('https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-guildes/1868100222-over');
            const ito = parser.parse(response.data);
            let actus = await ito.querySelectorAll('.ak-pagination li')[7].toString();
            return actus.replace(/<[^>]*>?/gm, '');
            
        } catch (e){
            console.log(e);
            return '';
        }
    },
    strip : s => {
        
        return s.replace(/<[^>]*>?/gm, '');
        
    }
};
