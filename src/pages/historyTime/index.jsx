import { useState, useEffect } from "react";
import { SpinCustom } from "components";


import {
  Button,
  Col,
  Layout,
  Row,
  Table,

} from "antd";
import moment from "moment";
import { SECOND_FORMAT, TYPE_KEEPING } from "utils/constants/config";
import { actionGetHistory } from "./actions";

const HistoryTime = () => {
  const [spinning, setSpinning] = useState(false);
  const [resultTimeKeep, setResultTimeKeep] = useState();
console.log(resultTimeKeep);
  const handlegetTimeKeep = async (d) => {
    setSpinning(true);
    try {
      const { data, status } = await actionGetHistory();

      if (status === 200) {
        setResultTimeKeep(data?.list_keeping_time)

      }
    } catch (err) {
      console.log(err);
    }
    setSpinning(false);
  };
  const columns = [
    {
      title: "Lần ",
      key: "id",
      dataIndex: "id",
      render: (text, record, index) => resultTimeKeep.length - index

    },
    {
      title: "Giờ chấm công",
      dataIndex: "time_keeping",
      key: "time_keeping",
      align: "center",
      render: function (text, record, index) {
        return moment(text * 1000).format(SECOND_FORMAT);
      },
    },
    {
      title: "Kiểu PVR",
      dataIndex: "keeping_type",
      key: "keeping_type",
      render: (v) => TYPE_KEEPING[v],
      align: "center",
    },
  ]

  useEffect(() => {
    handlegetTimeKeep()
  }, [])


  return (
    <Layout className="common-layout">
      <SpinCustom spinning={spinning}>
        <div className="common-layout--header">
          <Row className="filler" gutter={[8, 8]}>
          </Row>
        </div>

        <div className="common-layout--content">
          <Row gutter={[16,16]}>
            <Col span={24}>
             <Table
            rowKey={(r) => r.id}
            dataSource={resultTimeKeep}
            columns={columns}
            pagination={false}

          />
            </Col>
         <Col span={24} className="w-full" style={{textAlign:"center"}}>
         
          <Button type="primary" onClick={() => window.navigatePage("home")}>Quay lại</Button>
         </Col>
          </Row>
          
        </div>
      </SpinCustom>
    </Layout>
  );
};

export default HistoryTime;
