#!/usr/bin/env node

'use strict'

//token/coin/cryptocurrency input
var input = () => {
  var curency:string = "";
  const inputInner = () => {
    return new Promise<void>((resolve, reject) => {
      const readline = require('readline')
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          })
      rl.question('Please enter the name of a token/coin/cryptocurrency (ID or symbol)\n or \"quit\" to exit program.\n\n\n', (answer:string) => {
        if(answer == 'quit') process.exit(0);
        curency = answer.toLowerCase();
        resolve();
      })
      rl.close();
    })
  }
  return curency;
}
    

//checks if input is valid and returns coin Id
const inputIdCheck = async (input:String, coinsList:any) => {
    var isValid:Boolean = false;
    let i:number;
    for(i = 0; i < coinList.length; i++)
    {
        if(input == coinsList[i].symbol.toLowerCase())
        {
          isValid = true;
          input = coinsList[i].id.toLowerCase();
          return input;
        }
        else if(input == coinsList[i].id.toLowerCase())
        {
          isValid = true;
          return input;
        }
    }
    if(isValid = false)
    {
      console.log('Input is not valid cryptocurrency/token/coin.\n');
      return 'error';
    }
}

//checks if input is correct and returns coin symbol
const inputSymbolCheck = async (input:String, coinsList:any) => {
  var isValid:Boolean = false;
  let i:number;
  for(i = 0; i < coinList.length; i++)
  {
      if(input == coinsList[i].Id.toLowerCase())
      {
        isValid = true;
        input = coinsList[i].symbol.toLowerCase();
        return input;
      }
      else if(input == coinsList[i].symbol.toLowerCase())
      {
        isValid = true;
        return input;
      }
  }
  if(isValid = false)
  {
    console.log('Input is not valid cryptocurrency/token/coin.\n');
    return 'error';
  }
}

//collects list of all exchanges and returns exchangesList (Array with list of all exchanges)
var exchangeList = async(exchangesList = new Array()) => {

  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();

    let res = await ciongeckoclient.exchanges.list();
    exchangesList = res.data;
    return exchangesList;
}

//collects list of all coins and returns coinsList (Array with list of all coins)
var coinList = async(coinsList = new Array()) => {

  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();

  let res = await ciongeckoclient.coins.list();
  coinsList = res.data;
  return coinsList;
}

  //logic -> TODO
  var logic = async(resultPrice:number, resultExchange:string, currencyId:any, currencySymbol:any) => {

    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();

    var price:number = 0;
    var exchange:string = "";
    var atLeastOneExchange:boolean = false;

    var allCoinTickers = new Array();

    var coinTickers = async () => {
      var res = await ciongeckoclient.coins.fetchTickers(currencyId);
      console.log(res.tickers);
      allCoinTickers = JSON.parse(res.tickers);
    }

    coinTickers();

    var tickersNumber:number = 0;

    tickersNumber = allCoinTickers.length;

    let i;
    for(i = 0; i < tickersNumber; i++)
    {

      if(allCoinTickers[i].base == currencySymbol && (allCoinTickers[i].target == 'USD' || allCoinTickers[i].target == 'USDT')) 
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
      console.log('There is no exchange that ofers transaction ' + currencyId + ' to USD.\n');
    }
  }

//output of results
var output = (resultExchange:string, resultPrice:number) => {
    console.log(resultExchange + ' ' + resultPrice + '$' + '\n');
}

//main function
const main = async () => {
  var resultPrice:number = 0;
  var resultExchange:string = "";
  //var listOfExchanges = await exchangeList();
  var listOfCoins = await coinList();
  var currency:string = await input();
  var coinId = await inputIdCheck(currency, coinList);
  var coinSymbol = await inputSymbolCheck(currency, coinList);
  await logic(resultPrice, resultExchange, coinId, coinSymbol);
  output(resultExchange, resultPrice);
  }


//execution
main();
