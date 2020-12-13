#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { response } from "express";
const coingecko = require('coingecko-api');
const ciongeckoclient = new coingecko();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// var func = async() => {
//     let data = await ciongeckoclient.ping();
//     console.log(data);
// }
// func();
//token/coin/cryptocurency input
var curency = "";
const input = () => {
    return new Promise((resolve, reject) => {
        rl.question('Please enter the name of a token/coin/cryptocurency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer) => {
            if (answer == 'quit')
                process.exit(0);
            curency = answer;
            // console.log(answer);
            // console.log(curency);
            resolve();
        });
    });
};
//logic (sve stavit u petlju)
var resultExchange = "";
var resultPrice = "";
curency = curency.toLowerCase();
//output of results
var output = () => {
    console.log(resultExchange + ' ' + resultPrice + '\n');
};
//main function
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield input();
    rl.close();
    output();
});
//execution
var i;
for (i = 0; i < 2; i++) {
    main();
}
//# sourceMappingURL=app.js.map