import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../context/crypto-context.tsx';
import { getRandomColors } from '../utils.ts';

ChartJS.register(ArcElement, Tooltip, Legend);

const CryptoChart = () => {
    const {assets, coinsMap} = useCrypto();

    const data = {
        labels: assets.map(asset => asset.name),
        datasets: [
          {
            label: '$',
            data: assets.map(asset => asset.totalAmount),
            backgroundColor: getRandomColors(assets.length),
            borderColor: [
              '#fff'
            ],
            borderWidth: 1,
          },
        ],
      };

    return <Pie data={data} />
}
 
export default CryptoChart;