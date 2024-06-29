import { useState, useEffect } from "react";
import { SpinCustom } from "components";
import {  Layout } from "antd";
import TimeKepping from "./components/time-keeping";

const HomePage = () => {
  const [spinning, setSpinning] = useState(false);
  const [histories, setHistories] = useState();

  return (
    <Layout className="common-layout">
      <SpinCustom spinning={spinning}>
        <div className="common-layout--header"></div>

        <div className="common-layout--content">
          {!histories &&<TimeKepping 
            setSpinning={setSpinning}
            spinning={spinning}
            setHistories={setHistories}
          />}
        </div>
      </SpinCustom>
    </Layout>
  );
};

export default HomePage;
