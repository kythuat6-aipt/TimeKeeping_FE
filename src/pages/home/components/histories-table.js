import { DATETIME_FORMAT, TYPE_KEEPING } from "utils/constants/config";
import { Table, Row, Col, Button } from "antd"
import dayjs from "dayjs";

const HistoriesTable = ({ histories, setHistories}) => {
  return (
    <Row justify={"center"} gutter={[0, 12]}>
      <Col span={24}>
        <Table
          size="small"
          dataSource={histories}
          rowKey={(r) => r?.id}
          columns={[
            {
              title: "Lần",
              dataIndex: "index",
              key: "index",
              render: (v, r, i) => i + 1
            },
            {
              title: "Thời gian chấm công",
              dataIndex: "time_keeping",
              key: "time_keeping",
              render: (v, r, i) => dayjs(v).format(DATETIME_FORMAT)
            },
            {
              title: "PVR (Phút)",
              dataIndex: "freetime",
              key: "freetime",
              align: "center",
            },
            {
              title: "Kiểu chấm công",
              dataIndex: "type_keeping",
              key: "type_keeping",
              render: (v,r) => {
                if( v == 2 && (r?.freetime == 0||r?.freetime == null) ) return " "
                else return TYPE_KEEPING[v]
                },
            },
          ]}
        />
      </Col>

      <Col>
        <Button
          type="primary"
          onClick={() => setHistories(null)}
        >
          Quay lại
        </Button>
      </Col>
    </Row>
  )
}

export default HistoriesTable