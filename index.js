#!/usr/bin/env node
const readline = require("readline");
const contentReader = require("./contentReader.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

process.stdout.write("input your swagger url\n: ");
rl.on("line", (inputValue) => {

    contentReader.read('.', inputValue);

    rl.close();
});
 
rl.on('close', () => {
        process.exit();
})
