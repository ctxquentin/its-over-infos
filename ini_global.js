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

    getHTML: async () => {
      try {
          const response = await axios.get('https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-guildes/1868100222-over');
          const ito = parser.parse(response.data);
          const actus = ito.querySelectorAll('.ak-title');
          const html = await actus[0].toString();
          return html;
      } catch (e) {
          console.log(e);
          return  '';
      }
    },
    stripHTMl : function(){
        
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
        
    }
};
