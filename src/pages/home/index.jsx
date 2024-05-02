import { useState, useEffect } from "react";
import { SpinCustom } from "components";
import Keeping from "./keeping";
import {
  Layout,
  Row,
} from "antd";


const HomePage = () => {
  const [spinning, setSpinning] = useState(false);
  useEffect(() => {
  }, []);

 
  return (
    <Layout className="common-layout">
      <SpinCustom spinning={spinning}>
        <div className="common-layout--header">
          <Row className="filler" gutter={[8, 8]}>
          </Row>
        </div>

        <div className="common-layout--content">
        <Keeping />
        {/* <AllCameras/> */}
        </div>
      </SpinCustom>
    </Layout>
  );
};

export default HomePage;
