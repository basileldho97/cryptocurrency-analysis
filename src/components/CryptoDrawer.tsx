import { Button, Drawer, Flex, Result } from "antd";
import { useResize } from "../hooks/useResize.ts";
import CryptoSelect from "./CryptoSelect.tsx";
import { useState } from "react";
import AddAssetForm from "./AddAssetForm.js";
import { useCrypto } from "../context/crypto-context.tsx";

const CryptoDrawer = ({ isOpen, closeDrawer }) => {
  const { xm, sm, md } = useResize();
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();
  const [result, setResult] = useState(false)
  const [resultData, setResultData] = useState({})

  function setDrawerWidth() {
    if (xm) {
      return "80%";
    }
    if (sm) {
      return "60%";
    }
    if (md) {
      return "40%";
    }
    return "25%";
  }

  function handleClose() {
    closeDrawer(false);
    setCoin(null);
  }

  function findCoin(coin) {
    setCoin(crypto.find((c) => c.id === coin));
  }

  function handleResult(data){
    setResultData(data)
    setResult(true)
    setCoin(null)
  }

  function closeResult(){
    setResult(false)
    closeDrawer(false)
  }

  return (
    <Drawer
      className="main-drawer"
      title="Set Asset"
      placement={"right"}
      closable={false}
      onClose={() => handleClose()}
      open={isOpen}
      width={setDrawerWidth()}
    >
      <Button
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={() => handleClose()}
        type="primary"
      >
        close
      </Button>

      {coin && (
        <Flex align="center" style={{ width: "100%" }} justify="space-between">
          <Flex align="center">
            <img
              width="30"
              height="30"
              src={coin.icon}
              alt={coin.name}
              loading="lazy"
            />
            <h3
              style={{
                marginLeft: "10px",
                fontSize: "clamp(20px, 0.932rem + 1.59vw, 30px)",
              }}
            >
              {coin.name}
            </h3>
          </Flex>
          <div className="coin-reset" onClick={() => setCoin(null)}></div>
        </Flex>
      )}

      {!coin ? <div style={{width: '100%'}}><CryptoSelect func={findCoin} /></div> : <AddAssetForm coin={coin} getResultData={handleResult} />}
      {(result && !coin) && (
        <Result
          status="success"
          title="You added new asset!"
          subTitle={`You added ${resultData.amount} ${resultData.name} coins at a price of ${resultData.price}$`}
          extra={[
            <Button onClick={closeResult} type="primary" key="console">
              OK
            </Button>
          ]}
        />
      )}
    </Drawer>
  );
};

export default CryptoDrawer;
