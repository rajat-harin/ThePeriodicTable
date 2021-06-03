const express = require("express");
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.route("/data").get((req,res)=>{
    let rawdata = JSON.parse(fs.readFileSync(path.join(__dirname,'PeriodicTableJSON.json')));
    res.send(JSON.stringify(rawdata));
})

app.route("/").get((req,res)=>{
    console.log("here");
    res.sendFile(path.join(__dirname,"./index.html"))
})
//server
app.listen(port, (err) => {
    if (err) {
        console.log('Error starting Server!!!');
        console.log(err);
    }
    else {
        console.log(`Server is Running on port: ${port}`);
    }
})