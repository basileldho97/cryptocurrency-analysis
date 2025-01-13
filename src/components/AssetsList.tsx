
import AssetCard from "./AssetCard.js";
import Loader from "./Loader.tsx";
import {useCrypto} from "../context/crypto-context.tsx";
import { v4 as uuidv4 } from 'uuid';
import {Flex, Button} from 'antd'
import { saveAssets } from "../api.ts";

const AssetsList = () => {
    const {assets, setAssets, loading} = useCrypto();

    function clearAssets(){
      const clearedAssets = [];
      setAssets(clearedAssets);
      saveAssets(clearedAssets);
    }

    return ( 
       <>
       <Flex style={{margin: '10px',}} align="center" justify="space-between">
        <h2 style={{fontSize: 'clamp(20px, 0.932rem + 1.59vw, 34px)'}}>Assets</h2>
        {assets.length ? <Button onClick={clearAssets} type="primary">clear all</Button> : null}
       </Flex>
       {loading && <Loader/>}
       {assets && assets.map(asset => {
        return <AssetCard key={uuidv4()} asset={asset} />
       })}
       {!assets.length && <div style={{padding: '0 10px', lineHeight: '1.5'}}>Assets list is empty! <br /> add new asset...</div>}
       </>
     );
}
 
export default AssetsList;