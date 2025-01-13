import { Modal, Flex, Typography, Tag, Divider, Button } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CryptoCalculator from "./CryptoCalculator.js";
import { Coin } from "../types.ts";

interface Props {
  data: Coin,
  isOpen: boolean,
  closeModal: (boolean: boolean) => void,
}

const Cryptomodal = ({ data, isOpen, closeModal }: Props) => {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <Modal
      style={{ maxWidth: "90%" }}
      open={isOpen}
      onCancel={() => closeModal(false)}
      footer={null}
    >
      {data && (
        <>
          <Flex align="center">
            <img
              width="40"
              height="40"
              src={data.icon}
              alt={data.name}
              loading="lazy"
            />
            <h3
              style={{
                marginLeft: "10px",
                fontSize: "clamp(20px, 1.023rem + 1.14vw, 30px)",
              }}
            >
              {data.name}
            </h3>
            <strong
              style={{
                fontSize: "clamp(12px, 0.568rem + 0.91vw, 20px)",
                transform: "translateY(4px)",
              }}
            >
              &nbsp;({data.symbol})
            </strong>
          </Flex>
          <Typography.Text>
            <b>rank:</b> {data.rank}
          </Typography.Text>
          <Divider />
          <Flex align="center" gap={10} justify="center" wrap="wrap">
            <Typography.Text style={{ flexShrink: "0" }} strong>
              1 hour{" "}
              <Tag color={data.priceChange1h >= 0 ? "green" : "red"}>
                {data.priceChange1h}%
              </Tag>
            </Typography.Text>
            <Typography.Text style={{ flexShrink: "0" }} strong>
              1day{" "}
              <Tag color={data.priceChange1d >= 0 ? "green" : "red"}>
                {data.priceChange1d}%
              </Tag>
            </Typography.Text>
            <Typography.Text style={{ flexShrink: "0" }} strong>
              1week{" "}
              <Tag color={data.priceChange1w >= 0 ? "green" : "red"}>
                {data.priceChange1w}%
              </Tag>
            </Typography.Text>
          </Flex>
          <Divider />
          <CryptoCalculator price={data.price} symbol={data.symbol} />
          <Divider/>
          <Typography.Text>
            <b>Price:</b> {Number(data.price.toFixed(2)).toLocaleString()}$ /{" "}
            {data.priceBtc.toPrecision(3)}Btc
          </Typography.Text>{" "}
          <br />
          <Typography.Text>
            <b>MarKetCap:</b>{" "}
            {Number(data.marketCap.toFixed()).toLocaleString()}$
          </Typography.Text>{" "}
          <br />
          <Typography.Text>
            <b>Supply:</b> <span title="avialable">{data.availableSupply}</span>{" "}
            / <span title="total">{data.totalSupply}</span>
          </Typography.Text>{" "}
          <br />
          <Typography.Text>
            <b>Volume:</b> {Number(data.volume.toFixed()).toLocaleString()}$
          </Typography.Text>{" "}
          <br />
          <Flex style={{ paddingTop: "20px" }} justify="center">
            {!showMore && <Button type="primary" onClick={() => setShowMore(!showMore)}>
              more info
            </Button>}
          </Flex>
          {showMore && <div>
            <Divider/>
            {data.websiteUrl && <><div><b>Site:</b> </div><a href={data.websiteUrl} target="_blank" >{data.websiteUrl}</a></>}
            <br/>
            {data.redditUrl && <><div><b>Reddit:</b> </div><a href={data.redditUrl} target="_blank" >{data.redditUrl}</a></>}
            <br />
            {data.twitterUrl && <><div><b>Twitter:</b> </div><a href={data.twitterUrl} target="_blank" >{data.twitterUrl}</a></>}
            <br />
            {data.explorers && <>
            <div><b>Explorers:</b> </div>
            {data.explorers.map(link => (
                <a href={link} style={{display:'block', lineHeight: '1.3'}} key={uuidv4()} target="_blank">{link}</a>
            ))}
            </>}
            </div>}
        </>
      )}
    </Modal>
  );
};

export default Cryptomodal;
