#!/usr/bin/env node
"use strict";
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
//token/coin/cryptocurrency input
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
        var isValid = false;
        let i;
        var result = "";
        for (i = 0; i < coinsIdList.length; i++) {
            if (input == coinsSymbolList[i]) {
                isValid = true;
                result = coinsIdList[i];
                resolve(result);
            }
            else if (input == coinsIdList[i]) {
                isValid = true;
                result = coinsIdList[i];
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
        for (i = 0; i < coinsSymbolList.length; i++) {
            if (input == coinsIdList[i]) {
                isValid = true;
                result = coinsSymbolList[i];
                resolve(result);
            }
            else if (input == coinsSymbolList[i]) {
                isValid = true;
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
    return coinsList;
});
//logic
const logic = (currencyId, currencySymbol) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
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
            let j = 0;
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            var _ = require('underscore');
            while (true) {
                j++;
                yield sleep(500);
                var res = yield ciongeckoclient.coins.fetchTickers(currencyId, { page: j });
                if (_.isEmpty(res.data.tickers))
                    break;
                let i;
                console.log(_.isEmpty(res.data.tickers) + j);
                for (i = (j - 1) * 100; i < (j - 1) * 100 + res.data.tickers.length; i++) {
                    allCoinTickers[i] = res.data.tickers[i - (j - 1) * 100].base.toLowerCase() + '-' + res.data.tickers[i - (j - 1) * 100].target + '-' + res.data.tickers[i - (j - 1) * 100].market.name + '-' + res.data.tickers[i - (j - 1) * 100].last.toString();
                }
                console.log(allCoinTickers.length);
                //console.log(allCoinTickers)
                //console.log(res.data)
            }
        });
        yield coinTickers();
        let i;
        let parsed = new Array(); //base, target, exchange, price
        for (i = 0; i < allCoinTickers.length; i++) {
            parsed = allCoinTickers[i].split('-');
            //console.log(parsed)
            if (parsed[0] == currencySymbol && (parsed[1] == 'USD' || parsed[1] == 'USDT')) {
                atLeastOneExchange = true;
                price = parseFloat(parsed[3]);
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
    var currency = yield input();
    var listOfCoinsId = new Array();
    listOfCoinsId = yield coinIdList();
    var listOfCoinsSymbol = new Array();
    listOfCoinsSymbol = yield coinSymbolList();
    var coinId = "";
    coinId = yield inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol);
    console.log('currency ' + currency);
    var coinSymbol = "";
    coinSymbol = yield inputSymbolCheck(currency, listOfCoinsSymbol, listOfCoinsId);
    result = yield logic(coinId, coinSymbol);
    output(result);
});
//execution
main();
//# sourceMappingURL=app.js.map