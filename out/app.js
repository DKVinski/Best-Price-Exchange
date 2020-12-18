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
Object.defineProperty(exports, "__esModule", { value: true });
const coingecko = require('coingecko-api');
const ciongeckoclient = new coingecko();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//token/coin/cryptocurrency input
var curency = "";
var resultExchange = "";
var resultPrice = 0;
var exchangesNumber = 0;
var coinsNumber = 0;
var exchangesList = new Array();
var coinsList = new Array();
const input = () => {
    return new Promise((resolve, reject) => {
        rl.question('Please enter the name of a token/coin/cryptocurrency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer) => {
            if (answer == 'quit')
                process.exit(0);
            curency = answer.toLowerCase();
            resolve();
        });
    });
};
const inputCheck = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var isValid = false;
    var i;
    for (i = 0; i < coinsNumber; i++) {
        if (curency == coinsList[i].symbol.toLowerCase()) {
            isValid = true;
            curency = coinsList[i].id.toLowerCase();
            break;
        }
        else if (curency == coinsList[i].id.toLowerCase()) {
            isValid = true;
            break;
        }
    }
    if (isValid = false) {
        console.log('Input is not valid cryptocurrency/token/coin.\n');
    }
});
var exchangeList = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield ciongeckoclient.exchanges.list();
    exchangesList = res.data;
    exchangesNumber = exchangesList.length;
});
var coinList = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield ciongeckoclient.coins.list();
    coinsList = res.data;
    coinsNumber = coinsList.length;
});
var result = (index) => {
    var res = exchangesList[index];
    resultExchange = res.id;
};
//logic
var logic = () => __awaiter(void 0, void 0, void 0, function* () {
    var price = 0;
    var exchange = "";
    var atLeastOneExchange = false;
    var allCoinTickers = new Array();
    var coinTickers = () => __awaiter(void 0, void 0, void 0, function* () {
        var res = yield ciongeckoclient.coins.fetchTickers(curency);
        console.log(res.tickers);
        allCoinTickers = res.tickers;
        //console.log(allCoinTickers[0]);
    });
    coinTickers();
    var tickersNumber = 0;
    /*tickersNumber = allCoinTickers.length;
  
    let i;
    for(i = 0; i < tickersNumber; i++)
    {
  
      if(allCoinTickers[i].base == curency && (allCoinTickers[i].target == 'USD' || allCoinTickers[i].target == 'USDT'))
      {
        atLeastOneExchange = true;
        price = allCoinTickers[i].last;
        exchange = allCoinTickers[i].market.name;
  
        if(price > resultPrice)
        {
          resultPrice = price;
          resultExchange = exchange;
        }
  
      }
      
    }
  
    if(atLeastOneExchange = false)
    {
      console.log('There is no exchange that ofers transaction ' + curency + ' to USD.\n');
    }*/
});
//output of results
var output = () => {
    console.log(resultExchange + ' ' + resultPrice + '$' + '\n');
};
//main function
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exchangeList();
    yield coinList();
    yield input();
    //await inputCheck(curency);
    yield logic();
    //console.log(coinsList);
    rl.close();
    output();
});
//execution
main();
//# sourceMappingURL=app.js.map