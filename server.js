#!/usr/bin/env node

let express = require("express");
let app = express();

app.listen(3000, function(){
    console.log("App is running on port 3000");
});

app.use('/js', express.static(__dirname + '/'));

app.get("/", function(req, res){
    res.sendfile("./index.html");
});