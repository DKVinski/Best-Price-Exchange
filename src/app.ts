#!/usr/bin/env node

import * as idk from 'jquery';
import { isEmptyObject } from 'jquery';

//token/coin/cryptocurrency input
const input = async() => { 
  'use strict'
  var curency:string = "";
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
      const questionn = () => {
       return new Promise<void>((resolve, reject) => {
        rl.question('Please enter the name of a token/coin/cryptocurrency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer:string) => {
          if(answer == 'quit') { process.exit(0);};
          curency = answer.toLowerCase();
          resolve();
       })
      })
    }
  await questionn();
  rl.close();
  return curency;
}
    

//checks if input is valid and returns coin Id
const inputIdCheck = async (input:String, coinsIdList:Array<string>, coinsSymbolList:Array<string>) => {
  return new Promise<string>((resolve, reject) => {
    var isValid:Boolean = false;
    let i:number;
    var result:string = "";
    for(i = 0; i < coinsIdList.length; i++)
    {
        if(input == coinsSymbolList[i])
        {
          isValid = true;
          result = coinsIdList[i];
          resolve(result);
        }
        else if(input == coinsIdList[i])
        {
          isValid = true;
          result = coinsIdList[i]
          resolve(result);
        }
    }
    if(isValid == false)
    {
      console.log('Input is not valid cryptocurrency/token/coin.\n');
      process.exit(0);
    }
  })
}

//checks if input is valid and returns coin symbol
const inputSymbolCheck = async (input:String, coinsSymbolList:Array<string>, coinsIdList:Array<string>) => {
  return new Promise<string>((resolve, reject) => {
    var isValid:Boolean = false;
    let i:number;
    var result:string = "";
    for(i = 0; i < coinsSymbolList.length; i++)
    {
        if(input == coinsIdList[i])
        {
          isValid = true;
          result = coinsSymbolList[i]
          resolve(result);
        }
        else if(input == coinsSymbolList[i])
        {
          isValid = true;
          result = coinsSymbolList[i]
          resolve(result);
        }
    }
    if(isValid == false)
    {
      console.log('Input is not valid cryptocurrency/token/coin.\n');
      process.exit(0);
    }  
  })
}

//collects list of all coins and returns array with list of all coin Ids
var coinIdList = async() => {
  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();
  let res = await ciongeckoclient.coins.list();
  let i:number;
  var coinsList = new Array();
  for(i = 0; i < res.data.length; i++)
  {
    coinsList[i] = res.data[i].id.toString().toLowerCase();
  }
  return coinsList;
}

//collects list of all coins and returns array with list of all coin symbols
var coinSymbolList = async() => {
  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();
  let res = await ciongeckoclient.coins.list();
  let i:number;
  var coinsList = new Array();
  for(i = 0; i < res.data.length; i++)
  {
    coinsList[i] = res.data[i].symbol.toString().toLowerCase();
  }
  return coinsList;
}

  //logic
  //sends get requests to coingecko API and gathers the data (base coin (the currency from the input), target currency (USD, USDT)
  //(the assumption is that one theter USDT == USD), market name (exchenage name), and ticker.last (last ratio base/target) which
  //in our case is equal to the price)
  //after gathering of the data it checks each to determine the greatest price and exchange that offers that price
  const logic = async(currencyId:string, currencySymbol:string) => {
    return new Promise<string>(async(resolve, reject) => {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();
    var result:string = "";
    var currentPrice:number = 0;
    var currentExchenage:string = "";
    var price:number = 0;
    var exchange:string = "";
    var atLeastOneExchange:boolean = false;
    var allCoinTickers = new Array<string>();
    var coinTickers = async () => {
      let j:number = 0;
      function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var _ = require('underscore')
       while(true)
       {
             j++
             await sleep(500);
             var res = await ciongeckoclient.coins.fetchTickers(currencyId, {page : j});
             if(_.isEmpty(res.data.tickers)) break;
             let i: number;
           for(i = (j-1)*100; i < (j-1)*100+res.data.tickers.length; i++)
           {
             allCoinTickers[i] = res.data.tickers[i-(j-1)*100].base.toLowerCase() + '-' + res.data.tickers[i-(j-1)*100].target + '-' + res.data.tickers[i-(j-1)*100].market.name + '-' + res.data.tickers[i-(j-1)*100].last.toString();
           }
       } 
    }
    await coinTickers();
     let i;
     let parsed = new Array<string>(); //base, target, exchange, price
    for(i = 0; i < allCoinTickers.length; i++)
    {
       parsed= allCoinTickers[i].split('-');
      if(parsed[0] == currencySymbol && (parsed[1] == 'USD' || parsed[1] == 'USDT')) 
       {
        atLeastOneExchange = true;
        price = parseFloat(parsed[3]);
         exchange = parsed[2];
         if(price > currentPrice)
         {
           currentPrice = price;
           currentExchenage = exchange;
         }
      }
     }
    if(atLeastOneExchange = false)
    {
       console.log('There is no exchange that ofers transaction ' + currencyId + ' to USD.\n');
        process.exit(0);
     }
      result += currentExchenage;
      result += ' ' + currentPrice.toString();
     resolve(result);
  }
)}  

//output of the results
var output = (result:string) => {
    console.log('\n\n' + result + '$' + '\n');
}

//main function
const main = async () => {
  var result:string = "";
  var currency:string = await input();
  var listOfCoinsId = new Array<string>();
  listOfCoinsId = await coinIdList();
  var listOfCoinsSymbol = new Array<string>()
  listOfCoinsSymbol = await coinSymbolList();
  var coinId:string = "";
  coinId = await inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol);
  console.log('currency '+ currency)
  var coinSymbol:string = "";
  coinSymbol = await inputSymbolCheck(currency, listOfCoinsSymbol, listOfCoinsId);
  result = await logic(coinId, coinSymbol);
  output(result);
  }


//execution
main();
