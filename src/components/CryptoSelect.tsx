import { Space, Select, Typography } from "antd";
import { useCrypto } from "../context/crypto-context.tsx";
import { Coin } from "../types.ts";

interface CryptoSelectProps {
  func: (value: string) => void,
}

const CryptoSelect: React.FC<CryptoSelectProps> = ({func}) => {
    const {crypto} = useCrypto()

    const handleSelect = (value: string) => {
        func(value)
      };

    return ( 
        <Select
        className="crypto-select"
        placeholder="select coin"
        onSelect={handleSelect}
        optionLabelProp="label"
        options={crypto.map((coin: Coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{display: 'flex', alignItems: 'center',}}>
            <img width={26} height={26} loading="lazy" src={option.data.icon} alt={option.data.label} />
            <Typography.Text>{option.data.label}</Typography.Text>
          </Space>
        )}
      />
     );
}
 
export default CryptoSelect;