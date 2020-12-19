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
    console.log(yield questionn());
    rl.close();
    return curency;
});
//checks if input is valid and returns coin Id
const inputIdCheck = (input, coinsIdList, coinsSymbolList) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(() => {
        var isValid = false;
        let i;
        for (i = 0; i < coinsIdList.length; i++) {
            if (input == coinsSymbolList[i].toLowerCase()) {
                isValid = true;
                input = coinsIdList[i].toLowerCase();
                return input;
            }
            else if (input == coinsIdList[i].toLowerCase()) {
                isValid = true;
                return input;
            }
        }
        if (isValid == false) {
            console.log('Input is not valid cryptocurrency/token/coin.\n');
            return '';
        }
    });
});
//checks if input is correct and returns coin symbol
const inputSymbolCheck = (input, coinsSymbolList, coinsIdList) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(() => {
        var isValid = false;
        let i;
        for (i = 0; i < coinSymbolList.length; i++) {
            if (input == coinsIdList[i].toLowerCase()) {
                isValid = true;
                input = coinsSymbolList[i].toLowerCase();
                return input;
            }
            else if (input == coinsSymbolList[i].toLowerCase()) {
                isValid = true;
                return input;
            }
        }
        if (isValid == false) {
            console.log('Input is not valid cryptocurrency/token/coin.\n');
            process.exit(0);
        }
    });
});
//collects list of all exchanges and returns exchangesList (Array with list of all exchanges)
var exchangeList = (exchangesList = new Array()) => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    let res = yield ciongeckoclient.exchanges.list();
    exchangesList = res.data;
    return exchangesList;
});
//collects list of all coins and returns coinsList (Array with list of all coins)
var coinIdList = () => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    let res = yield ciongeckoclient.coins.list();
    let i;
    var coinsList = new Array();
    for (i = 0; i < res.data.length; i++) {
        coinsList[i] = res.data[i].id.toString();
    }
    return coinsList;
});
var coinSymbolList = () => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    let res = yield ciongeckoclient.coins.list();
    let i;
    var coinsList = new Array();
    for (i = 0; i < res.data.length; i++) {
        coinsList[i] = res.data[i].symbol.toString();
    }
    return coinsList;
});
//logic -> TODO
var logic = (resultPrice, resultExchange, currencyId, currencySymbol) => __awaiter(void 0, void 0, void 0, function* () {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    var price = 0;
    var exchange = "";
    var atLeastOneExchange = false;
    var allCoinTickers = new Array();
    var coinTickers = () => __awaiter(void 0, void 0, void 0, function* () {
        var res = yield ciongeckoclient.coins.fetchTickers(currencyId);
        console.log(res.tickers);
        allCoinTickers = JSON.parse(res.tickers);
    });
    coinTickers();
    var tickersNumber = 0;
    tickersNumber = allCoinTickers.length;
    let i;
    for (i = 0; i < tickersNumber; i++) {
        if (allCoinTickers[i].base == currencySymbol && (allCoinTickers[i].target == 'USD' || allCoinTickers[i].target == 'USDT')) {
            atLeastOneExchange = true;
            price = allCoinTickers[i].last;
            exchange = allCoinTickers[i].market.name;
            if (price > resultPrice) {
                resultPrice = price;
                resultExchange = exchange;
            }
        }
    }
    if (atLeastOneExchange = false) {
        console.log('There is no exchange that ofers transaction ' + currencyId + ' to USD.\n');
    }
});
//output of results
var output = (resultExchange, resultPrice) => {
    console.log(resultExchange + ' ' + resultPrice + '$' + '\n');
};
//main function
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var resultPrice = 0;
    var resultExchange = "";
    //var listOfExchanges = await exchangeList();
    var currency = yield input();
    var listOfCoinsId = new Array();
    listOfCoinsId = yield coinIdList();
    var listOfCoinsSymbol = new Array();
    listOfCoinsSymbol = yield coinSymbolList();
    var coinId = yield inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol);
    var coinSymbol = yield inputSymbolCheck(currency, listOfCoinsSymbol, listOfCoinsId);
    yield logic(resultPrice, resultExchange, coinId, coinSymbol);
    output(resultExchange, resultPrice);
});
//execution
main();
//# sourceMappingURL=app.js.map