import { Table } from "antd";
import { useCrypto } from "../context/crypto-context.tsx";
import { v4 as uuidv4 } from "uuid";

const CryptoTable = () => {
  const { crypto } = useCrypto();

  const cryptoData = crypto.map((coin) => {
    return {
      key: uuidv4(),
      rank: coin.rank,
      name: coin.name,
      price: coin.price.toFixed(2) + ' $',
      sortPrice: coin.price,
      h: coin.priceChange1h + '%',
      sortH: coin.priceChange1h,
      d: coin.priceChange1d + '%',
      sortD: coin.priceChange1d,
      w: coin.priceChange1w + '%',
      sortW: coin.priceChange1w,
    };
  });

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      sorter: {
        compare: (a, b) => a.rank - b.rank,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.sortPrice - b.sortPrice,
      },
    },
    {
      title: "1h",
      dataIndex: "h",
      sorter: {
        compare: (a, b) => a.sortH - b.sortH,
      },
    },
    {
      title: "1d",
      dataIndex: "d",
      sorter: {
        compare: (a, b) => a.sortD - b.sortD,
      },
    },
    {
      title: "1w",
      dataIndex: "w",
      sorter: {
        compare: (a, b) => a.sortW - b.sortW,
      },
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      price: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  return <Table size='small' bordered={true}  columns={columns} dataSource={cryptoData} />;
};

export default CryptoTable;
