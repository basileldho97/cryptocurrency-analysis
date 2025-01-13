import { Flex } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CryptoSelect from "../components/CryptoSelect.js";
import { useEffect, useState } from "react";
import PeriodSelect from "../components/PeriodSelect.js";
import { getCryptoChart } from "../api.ts";
import Loader from "../components/Loader.js";
import { getRandomColors } from "../utils.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
    const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState(null);
  const [period, setPeriod] = useState(null);
  const [chartData, setChartData] = useState([]);

  async function getChart(){
        setLoading(true)
        const result = await getCryptoChart(coin, period);
        setChartData(result);
        setLoading(false)
 }
 useEffect(() => {
    if(coin && period){
        getChart()
    }
  }, [coin, period]);

 const data = {
    labels: chartData.map(dataItem => new Date(dataItem[0] * 1000).toLocaleString()),
    datasets: [
      {
        label: coin,
        data: chartData.map(dataItem => dataItem[1]),
        borderColor: getRandomColors(1),
        backgroundColor: getRandomColors(1),
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Crypto Line Chart",
      },
    },
  };

  return (
    <div style={{padding: '10px'}}>
      <Flex wrap="wrap" gap={10} style={{ padding: "10px" }}>
        <CryptoSelect func={(value) => setCoin(value)} />
        <PeriodSelect func={(value) => setPeriod(value)} />
      </Flex>
      {chartData.length ? <Line options={options} data={data} /> : null}
      {loading && <Loader />}
    </div>
  );
};

export default ChartPage;