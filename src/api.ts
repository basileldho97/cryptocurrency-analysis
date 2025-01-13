import axios from "axios";
import { APIkey, baseURL } from "./constants";
import { Coin } from "./types";

export function getCryptoDAta(): Promise<Array<Coin>> {
    const limit = 1000;
    const url = `${baseURL}?limit=${limit}`;
    const options = {
      headers: {
        accept: 'application/json',
        'X-API-KEY': APIkey,
      }
    };
  
    return axios.get(url, options)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        alert('something was wrong! pleas reload page!')
        return null;
      });
  }

export function fetchAssets(): Promise<Array<object> | null>{
    return new Promise((resolve) => {
      const cryptoAssetsString = localStorage.getItem('cryptoAssets');
        if(cryptoAssetsString !== null){
            resolve(JSON.parse(cryptoAssetsString))
        } else{
            resolve(null)
        }
    })
}

export function saveAssets(assets: Array<Object>){
  localStorage.setItem("cryptoAssets", JSON.stringify(assets));
}


export function getCryptoChart(coin: string, period: number) {
  const url = `${baseURL}/${coin}/charts?period=${period}`;
  const options = {
    headers: {
      accept: 'application/json',
      'X-API-KEY': APIkey,
    }
  };

  return axios.get(url, options)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      alert('something was wrong! pleas reload page!')
      return null;
    });
}

export function getExchangesData(): Promise<Array<object>> {
  const url = `https://openapiv1.coinstats.app/tickers/exchanges`;
  const options = {
    headers: {
      accept: 'application/json',
      'X-API-KEY': APIkey,
    }
  };

  return axios.get(url, options)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      alert('something was wrong! pleas reload page!')
      return null;
    });
}

