const express = require('express');
const CoinGecko = require('coingecko-api');
const indexRouter = express.Router();
const CoinGeckoClient = new CoinGecko();

const price = {
  baby: 0,
  milk: 0
}

const refreshPrice = () => {
  CoinGeckoClient.simple.price({
    ids: ['babyswap', 'the-crypto-you'],
    vs_currencies: ['usd', 'usd'],
  }).then(res => {
    if(res.success){
      console.log('update price');
      price.baby = res.data.babyswap.usd;
      price.milk = res.data['the-crypto-you'].usd;
    }
  })
  .catch(err => refreshPrice());
}

/* GET home page. */
indexRouter.get('/price', (req, res) => {
  res.status(200).send(price);
});


refreshPrice();
setInterval(refreshPrice, 40000);

module.exports = indexRouter;
