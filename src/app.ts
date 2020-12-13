#!/usr/bin/env node

'use strict'

//import { response } from "express";

const coingecko = require('coingecko-api');
const ciongeckoclient = new coingecko();

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

    // var func = async() => {
    //     let data = await ciongeckoclient.ping();
    //     console.log(data);
    // }

    // func();

//token/coin/cryptocurrency input
var curency:string = "";

const input = () => {
    return new Promise<void>((resolve, reject) => {
      rl.question('Please enter the name of a token/coin/cryptocurrency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer:string) => {
        if(answer == 'quit') process.exit(0);
        curency = answer;
        // console.log(answer);
        // console.log(curency);
        resolve();
      })
    })
  }

//logic (sve stavit u petlju)
var resultExchange:string = "";
var resultPrice:number = 0;

curency = curency.toLowerCase();



//output of results
var output = () => {
    console.log(resultExchange + ' ' + resultPrice + '$' + '\n');
}

//main function
const main = async () => {
await input();
rl.close();
output();
}

//execution
main();
