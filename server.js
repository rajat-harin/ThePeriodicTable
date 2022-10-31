const express = require("express");
const path = require('path');
const fs = require('fs');
const cors = require('cors');
var exphbs  = require('express-handlebars');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.route("/data").get((req,res)=>{
    let rawdata = JSON.parse(fs.readFileSync(path.join(__dirname,'public/PeriodicTableJSON.json')));
    res.send(JSON.stringify(rawdata));
})

// app.route("/").get((req,res)=>{
//     console.log("here");
//     res.sendFile(path.join(__dirname,"./index.html"))
// })
//server
app.route("/element/:number").get((req,res)=>{
    let number = req.params.number;
    let rawdata = JSON.parse(fs.readFileSync(path.join(__dirname,'public/PeriodicTableJSON.json')));
    rawdata.elements.forEach(element => {
        if(element.number == number)
            res.render('home',{
                element: element,
                helpers: {
                    toString: function (aString) { return JSON.stringify(aString); },
                    catToClass: function (param) { return param.replace(" ","-")},
                    toPrecision: function (aString) { return aString.toPrecision(5); },
                    toStringFormatted: function (aString) {
                        aString.shells = '['+aString.shells.join(" ") +']';
                        aString.ionization_energies = '['+aString.ionization_energies.join(" ")+']';
                        let str = JSON.stringify(aString);
                        str = str.replace(/,/g,'\n');
                        return str; 
                        },
                }
            });
    });
    
})
app.listen(port, (err) => {
    if (err) {
        console.log('Error starting Server!!!');
        console.log(err);
    }
    else {
        console.log(`Server is Running on port: ${port}`);
    }
})