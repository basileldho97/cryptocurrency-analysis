import { Card, Statistic, List, Typography, Tag, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalise } from "../utils.ts";
import { useCrypto } from "../context/crypto-context.tsx";


const AssetCard = ({asset}) => {
  const {removeAsset} = useCrypto()

  return (
    <Card style={{ margin: 10 }}>

      <Button onClick={() => removeAsset(asset.assetId)} style={{position: 'absolute', top: '10px', right: '10px'}} type="primary" >remove asset</Button>
      <img width="20" height="20" src={asset.icon} alt="asset.id" />
      
      <Statistic
        title={capitalise(asset.id)}
        value={asset.totalAmount}
        precision={2}
        valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix="$"
      />

      <List
        dataSource={[
            {title: 'TotalProfit', value: asset.totalProfit.toFixed(2) + ' $', textcolor: asset.grow ? 'success' : 'danger'},
            {title: 'Asset Amount', value: asset.amount},
            {title: 'Difference', value: asset.growPercent + ' %', textcolor: asset.grow ? 'green' : 'red', Tag: true},
        ]}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>
            {item.title}
            </Typography.Text>
            {item.Tag && <Tag color={item.textcolor }>
                {item.value}
            </Tag>}
            {!item.Tag && <Typography.Text type={item.textcolor }>
                {item.value}
            </Typography.Text>}
          </List.Item>
        )}
      />
      <div style={{textAlign: 'right', color: '#000', opacity: '0.5'}}>{asset.date} {asset.time && asset.time}</div>
    </Card>
  );
};

export default AssetCard;
