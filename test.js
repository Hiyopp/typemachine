#!/usr/bin/env node
let greeting = require('./index');
console.log(process.argv);
console.log("Greeting : "+greeting[process.argv[2]]);