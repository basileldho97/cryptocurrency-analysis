import { useEffect, useState } from "react";
import { Input, Select } from 'antd';
import Loader from "../components/Loader.js";
import { getExchangesData } from "../api.ts";
import ExchangesCard from "../components/ExchangesCard.js";

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [filter, setFilter] = useState([]);
  const [selectValue, setSelectValue] = useState('default');
  const [load, setLoad] = useState(false);

  async function getExchanges() {
    setLoad(true);
    const result = await getExchangesData();
    setExchanges(result);
    filterExchanges(result, '');
    setLoad(false);
  }

  useEffect(() => {
    getExchanges();
  }, [])

  function filterExchanges(arr, value){
    const newArray = [...arr];
    setFilter(newArray.filter(ex => ex.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
    setSelectValue('default')
  }

  function handleChange(value) {
    let newArray = [...filter];
    
    switch (value) {
      case 'rank':
        setFilter(newArray.sort((a,b) => a.rank - b.rank));
        break;
      case 'name':
        setFilter(newArray.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }));
        break;
        case 'volume1m' :
          setFilter(newArray.sort((a,b) => b.volume1m - a.volume1m));
        break;
        case 'volume7d' :
          setFilter(newArray.sort((a,b) => b.volume7d - a.volume7d));
        break;
        case 'volume24h' :
          setFilter(newArray.sort((a,b) => b.volume24h - a.volume24h));
        break;
        case 'change24h' :
          setFilter(newArray.sort((a,b) => b.change24h - a.change24h));
        break;
      default:
        break;
    }
    setSelectValue(value)
  };
  

  return (
    <div className="exchanges-page">
        <div className="exchanges-header">
        <Input placeholder="Search..." style={{maxWidth: '250px'}}  onChange={(e) => filterExchanges(exchanges, e.target.value)} />
        <Select
      defaultValue="disabled"
      style={{ maxWidth: '250px', width: '100%' }}
      value={selectValue}
      onChange={handleChange}
      options={[
        { value: 'rank', label: 'rank' },
        { value: 'name', label: 'name' },
        { value: 'volume1m', label: 'volume 1 month' },
        { value: 'volume7d', label: 'volume 1 week' },
        { value: 'volume24h', label: 'volume 24 hours' },
        { value: 'change24h', label: 'change 24 hours' },
        { value: 'default', label: 'Sort by...', disabled: true },
      ]}
    />
        </div>
      <div className="cards-wrapper">
      {filter.length ? filter.map(exchange => <ExchangesCard key={exchange.id} exchange={exchange} />) : null}
      </div>
      {load && <Loader />}
    </div>
  );
};

export default ExchangesPage;
