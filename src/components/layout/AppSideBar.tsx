import { Layout } from "antd";
import { useResize } from "../../hooks/useResize.ts";
import AssetsList from "../AssetsList.js";

const AppSideBar = () => {
  const { xm, sm, md } = useResize();

  function setSideBarWidth() {
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

  return (
    <Layout.Sider
      width={setSideBarWidth()}
      breakpoint="md"
      collapsedWidth="0"
      id="app-sidebar"
    >
      <AssetsList />
    </Layout.Sider>
  );
};

export default AppSideBar;
