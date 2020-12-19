#!/usr/bin/env node
"use strict";
//token/coin/cryptocurrency input
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = () => __awaiter(void 0, void 0, void 0, function* () {
    'use strict';
    var curency = "";
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const questionn = () => {
        return new Promise((resolve, reject) => {
            rl.question('Please enter the name of a token/coin/cryptocurrency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer) => {
                if (answer == 'quit') {
                    process.exit(0);
                }
                ;
                curency = answer.toLowerCase();
                resolve();
            });
        });
    };
    yield questionn();
    rl.close();
    return curency;
});
//checks if input is valid and returns coin Id
const inputIdCheck = (input, coinsIdList, coinsSymbolList) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        //console.log('id check');
        var isValid = false;
        let i;
        var result = "";
        //console.log(coinsIdList.length);
        //console.log(coinsSymbolList.length);
        for (i = 0; i < coinsIdList.length; i++) {
            if (input == coinsSymbolList[i]) {
                isValid = true;
                result = coinsIdList[i];
                //console.log('symbol '+input);
                //return result;
                resolve(result);
            }
            else if (input == coinsIdList[i]) {
                isValid = true;
                //console.log('id '+input);
                result = coinsIdList[i];
                //return result;
                resolve(result);
            }
        }
        if (isValid == false) {
            console.log('Input is not valid cryptocurrency/token/coin.\n');
            process.exit(0);
        }
    });
});
//checks if input is correct and returns coin symbol
const inputSymbolCheck = (input, coinsSymbolList, coinsIdList) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var isValid = false;
        let i;
        var result = "";
        //console.log("LIST SYMBOL \n"+coinsSymbolList);
        //console.log("LIST ID\n"+coinsIdList)
        //console.log(coinsSymbolList.length)
        for (i = 0; i < coinsSymbolList.length; i++) {
            //console.log(coinsIdList[i]);
            if (input == coinsIdList[i]) {
                isValid = true;
                //console.log('kvak');
                result = coinsSymbolList[i];
                resolve(result);
            }
            else if (input == coinsSymbolList[i]) {
                isValid = true;
                //console.log('kvak');
                result = coinsSymbolList[i];
                resolve(result);
            }
        }
        if (isValid == false) {
            console.log('Input is not valid cryptocurrency/token/coin.\n');
            process.exit(0);
        }
    });
});
//collects list of all exchanges and returns exchangesList (Array with list of all exchanges)
// var exchangeList = async(exchangesList = new Array()) => {
//   const coingecko = require('coingecko-api');
//   const ciongeckoclient = new coingecko();
//     let res = await ciongeckoclient.exchanges.list();
//     exchangesList = res.data;
//     return exchangesList;
// }
//collects list of all coins and returns coinsList (Array with list of all coins)
var coinIdList = () => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    let res = yield ciongeckoclient.coins.list();
    let i;
    var coinsList = new Array();
    for (i = 0; i < res.data.length; i++) {
        coinsList[i] = res.data[i].id.toString().toLowerCase();
    }
    //console.log('kvak');
    return coinsList;
});
var coinSymbolList = () => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    let res = yield ciongeckoclient.coins.list();
    let i;
    var coinsList = new Array();
    for (i = 0; i < res.data.length; i++) {
        coinsList[i] = res.data[i].symbol.toString().toLowerCase();
    }
    //console.log('kvak');
    return coinsList;
});
//logic -> TODO
const logic = (currencyId, currencySymbol) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log('nes se dogadja');
        const coingecko = require('coingecko-api');
        const ciongeckoclient = new coingecko();
        var result = "";
        var currentPrice = 0;
        var currentExchenage = "";
        var price = 0;
        var exchange = "";
        var atLeastOneExchange = false;
        var allCoinTickers = new Array();
        var coinTickers = () => __awaiter(void 0, void 0, void 0, function* () {
            var res = yield ciongeckoclient.coins.fetchTickers(currencyId, '', '', 61);
            //var result = JSON.stringify(res)
            //console.log(result);
            let i;
            for (i = 0; i < res.data.tickers.length; i++) {
                allCoinTickers[i] = res.data.tickers[i].base.toLowerCase() + '-' + res.data.tickers[i].target + '-' + res.data.tickers[i].market.name + '-' + res.data.tickers[i].last.toString();
            }
            console.log(allCoinTickers.length);
            //console.log(allCoinTickers)
        });
        yield coinTickers();
        let i;
        let parsed = new Array(); //base, target, exchange, price
        for (i = 0; i < allCoinTickers.length; i++) {
            parsed = allCoinTickers[i].split('-');
            //console.log(parsed)
            if (parsed[0] == currencySymbol && (parsed[1] == 'USD' || parsed[1] == 'USDT')) {
                atLeastOneExchange = true;
                price = parseInt(parsed[3]);
                exchange = parsed[2];
                if (price > currentPrice) {
                    currentPrice = price;
                    currentExchenage = exchange;
                }
            }
        }
        if (atLeastOneExchange = false) {
            console.log('There is no exchange that ofers transaction ' + currencyId + ' to USD.\n');
            process.exit(0);
        }
        result += currentExchenage;
        result += ' ' + currentPrice.toString();
        console.log(result);
        resolve(result);
    }));
});
//output of results
var output = (result) => {
    console.log('\n\n' + result + '$' + '\n');
};
//main function
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var result = "";
    //var listOfExchanges = await exchangeList();
    var currency = yield input();
    var listOfCoinsId = new Array();
    listOfCoinsId = yield coinIdList();
    //console.log('ID\n'+listOfCoinsId);
    var listOfCoinsSymbol = new Array();
    listOfCoinsSymbol = yield coinSymbolList();
    //console.log('SYMBOL\n'+listOfCoinsSymbol);
    //console.log('1');
    var coinId = "";
    coinId = yield inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol);
    //inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol).then(function(result){
    //  coinId = result;
    //})
    //console.log('ID '+ coinId);
    //console.log('2');
    console.log('currency ' + currency);
    var coinSymbol = "";
    coinSymbol = yield inputSymbolCheck(currency, listOfCoinsSymbol, listOfCoinsId);
    //console.log('SYMBOL '+coinSymbol);
    //console.log('3');
    result = yield logic(coinId, coinSymbol);
    //console.log('4');
    output(result);
});
//execution
main();
//# sourceMappingURL=app.js.map