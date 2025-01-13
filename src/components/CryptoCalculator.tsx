import { Input } from 'antd';
import Icons, { IconNameList } from './Icons.tsx';
import { useEffect, useState } from 'react';

interface Props {
    price: number,
    symbol: string,
}

const CryptoCalculator = ({price, symbol}: Props) => {

    const [coin, setCoin] = useState<number | null>(null);
    const [usd, setUsd] = useState<number | null>(null);

    function cryptoInputHandler(value: string){
        setCoin(+value)
        setUsd(+value * +price)
    }

    useEffect(() => {
        setCoin(null)
        setUsd(null)
    }, [symbol])

    function usdInputHandler(value: string){
        setUsd(+value)
        setCoin( +value / +price)
    }

    return ( <div className="crypto-calculator">
        <Input placeholder={symbol} value={coin ?? undefined} type="number" step="0.01" onChange={(e) => cryptoInputHandler(e.target.value)} />
        <div style={{paddingRight: '20px'}}><Icons iconName={IconNameList.Calculator} /></div>
        <Input placeholder="USD" value={usd ?? undefined} type="number" step="0.01" onChange={(e) => usdInputHandler(e.target.value)} />
    </div> );
}
 
export default CryptoCalculator;