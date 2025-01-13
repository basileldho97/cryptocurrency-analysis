import { createContext, useContext, useEffect, useState } from "react";
import { fetchAssets, getCryptoDAta, saveAssets } from "../api.ts";
import { calculatePercentageDifference } from "../utils.ts";
import { Coin } from "../types.ts";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const [coinsMap, setcoinsMap] = useState({})

  async function preload() {
    setLoading(true);
    const { result } = await getCryptoDAta();
    console.log(result)
    const assetsData = await fetchAssets();

    const pricesMap = result.reduce((acc, coin) => {
      acc[coin.id] = {
        price: coin.price,
        name: coin.name,
      };
      return acc;
    }, {});

    setCrypto(result);
    setcoinsMap(pricesMap)

    getAssets(assetsData, pricesMap);
    setLoading(false);
  }

  useEffect(() => {
    preload();
  }, []);

  function getAssets(assets, coinsMap) {
    assets ? setAssets(
          assets.map((asset) => {
            return {
              grow: asset.price < coinsMap[asset.id].price,
              growPercent: calculatePercentageDifference(
                asset.price,
                coinsMap[asset.id].price
              ),
              totalAmount: asset.amount * coinsMap[asset.id].price,
              totalProfit:
                asset.amount * coinsMap[asset.id].price - asset.amount * asset.price,
              amount: asset.amount,
              date: asset.date,
              icon: asset.icon,
              id: asset.id,
              price: asset.price,
              time: asset.time,
              assetId: asset.assetId,
              name: asset.name,
            };
          })
        )
      : setAssets([]);
  }

  function removeAsset(assetId: number) {
    const updatedAssets = assets.filter((asset) => asset.assetId !== assetId);
    setAssets(updatedAssets);
    saveAssets(updatedAssets);
  }

  function addAsset(asset) {
    const updatedAssets = [
      {
        grow: asset.price < coinsMap[asset.id].price,
        growPercent: calculatePercentageDifference(asset.price, coinsMap[asset.id].price),
        totalAmount: asset.amount * coinsMap[asset.id].price,
        totalProfit: asset.amount * coinsMap[asset.id].price - asset.amount * asset.price,
        amount: asset.amount,
        date: asset.date,
        icon: asset.icon,
        id: asset.id,
        price: asset.price,
        time: asset.time,
        assetId: Date.now(),
        name: coinsMap[asset.id].name,
      },
      ...assets,
    ]
    setAssets(updatedAssets);
    saveAssets(updatedAssets)
  }

  return (
    <CryptoContext.Provider
      value={{
        assets,
        crypto,
        loading,
        coinsMap,
        removeAsset,
        addAsset,
        setAssets,
        preload,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}
