const cheerio = require("cheerio");
var request = require('request');
const parser = require("node-html-parser");


module.exports = { 

    getHTML : () => request('https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-guildes/1868100222-over', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const ito = parser.parse(html);
            var actus = ito.querySelectorAll('.ak-title');
            console.log(actus[0].toString());
            return actus[0].toString();
        }
    }),

    stripHTMl : function(){
        
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
        
    }
};
