import defaultIcon from "../assets/exchange-icon.jpg";
import { Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const ExchangesCard = ({ exchange }) => {
  //console.log(exchange);
  return (
    <div onClick={() => console.log(exchange)} className="card">
      <div className="heading">
        <div className="img-wrapper">
          <img
            src={exchange.icon ? exchange.icon : defaultIcon}
            alt={exchange.name}
          />
        </div>
        <h4>{exchange.name}</h4>
      </div>
      <div className="item">
        <b>rank:</b> {exchange.rank}
      </div>
      {exchange.volume24h ? (
        <div className="item">
          <b>volume 24 hours:</b> {exchange.volume24h.toLocaleString()}$
        </div>
      ) : (
        <div className="item">-</div>
      )}
      {exchange.volume7d ? (
        <div className="item">
          <b>volume 1 week:</b> {exchange.volume7d.toFixed(2)}$
        </div>
      ) : (
        <div className="item">-</div>
      )}
      {exchange.volume24h ? (
        <div className="item">
          <b>volume 1 month:</b> {exchange.volume24h.toFixed(2)}$
        </div>
      ) : (
        <div className="item">-</div>
      )}
      {exchange.change24h ? (
        <div className="item"> change 24 hours:
          <Statistic
            title="change 24 hours"
            value={exchange.change24h}
            precision={2}
            valueStyle={{ color: exchange.change24h > 0 ? '#3f8600' : "#cf1322" }}
            prefix={exchange.change24h > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
        </div>
      ) : (
        <div className="item">change 24 hours: <span style={{color: '#3f8600'}}>0%</span></div>
      )}
      {exchange.url ? <div className="item" style={{justifyContent: 'flex-end'}}><a href={exchange.url} target="_blank">site</a></div> : <div className="item"></div>}
    </div>
  );
};

export default ExchangesCard;
