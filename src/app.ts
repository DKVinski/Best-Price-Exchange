#!/usr/bin/env node

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

  console.log(await questionn());
  rl.close();
  return curency;
}
    

//checks if input is valid and returns coin Id
const inputIdCheck = async (input:String, coinsIdList:Array<string>, coinsSymbolList:Array<string>) => {
  return new Promise<string>(() => {

    var isValid:Boolean = false;
    let i:number;

    for(i = 0; i < coinsIdList.length; i++)
    {
        if(input == coinsSymbolList[i].toLowerCase())
        {
          isValid = true;
          input = coinsIdList[i].toLowerCase();
          return input;
        }
        else if(input == coinsIdList[i].toLowerCase())
        {
          isValid = true;
          return input;
        }
    }
    if(isValid == false)
    {
      console.log('Input is not valid cryptocurrency/token/coin.\n');
      return '';
    }
  })

}

//checks if input is correct and returns coin symbol
const inputSymbolCheck = async (input:String, coinsSymbolList:Array<string>, coinsIdList:Array<string>) => {
  return new Promise<string>(() => {

    var isValid:Boolean = false;
    let i:number;
  
    for(i = 0; i < coinSymbolList.length; i++)
    {
        if(input == coinsIdList[i].toLowerCase())
        {
          isValid = true;
          input = coinsSymbolList[i].toLowerCase();
          return input;
        }
        else if(input == coinsSymbolList[i].toLowerCase())
        {
          isValid = true;
          return input;
        }
    }
    if(isValid == false)
    {
      console.log('Input is not valid cryptocurrency/token/coin.\n');
      process.exit(0);
    }  
  })
  
}

//collects list of all exchanges and returns exchangesList (Array with list of all exchanges)
// var exchangeList = async(exchangesList = new Array()) => {

//   const coingecko = require('coingecko-api');
//   const ciongeckoclient = new coingecko();

//     let res = await ciongeckoclient.exchanges.list();
//     exchangesList = res.data;
//     return exchangesList;
// }

//collects list of all coins and returns coinsList (Array with list of all coins)
var coinIdList = async() => {

  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();

  let res = await ciongeckoclient.coins.list();
  let i:number;
  var coinsList = new Array();
  for(i = 0; i < res.data.length; i++)
  {
    coinsList[i] = res.data[i].id.toString();
  }
  return coinsList;
}

var coinSymbolList = async() => {

  const coingecko = require('coingecko-api');
  const ciongeckoclient = new coingecko();

  let res = await ciongeckoclient.coins.list();
  let i:number;
  var coinsList = new Array();
  for(i = 0; i < res.data.length; i++)
  {
    coinsList[i] = res.data[i].symbol.toString();
  }
  return coinsList;
}

  //logic -> TODO
  var logic = async(currencyId:any, currencySymbol:any) => {
    return new Promise<Array<any>> (() => {
    const coingecko = require('coingecko-api');
    const ciongeckoclient = new coingecko();

    var result = new Array();

    var currentPrice:number = 0;
    var currentExchenage = "";

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

    result[0] = currentExchenage;
    result[1] = currentPrice;
    return result;
  }
)}  

//output of results
var output = (resultExchange:string, resultPrice:number) => {
    console.log(resultExchange + ' ' + resultPrice + '$' + '\n');
}

//main function
const main = async () => {
  var result = new Array();
  result[0] = ""; //result exchange
  result[1] = 0; //result price
  //var listOfExchanges = await exchangeList();
  var currency:string = await input();
  var listOfCoinsId = new Array<string>();
  listOfCoinsId = await coinIdList();
  var listOfCoinsSymbol = new Array<string>()
  listOfCoinsSymbol = await coinSymbolList();
  var coinId:string = await inputIdCheck(currency, listOfCoinsId, listOfCoinsSymbol);
  var coinSymbol:string = await inputSymbolCheck(currency, listOfCoinsSymbol, listOfCoinsId);
  result = await logic(coinId, coinSymbol);

  output(result[0], result[1]);
  }


//execution
main();
