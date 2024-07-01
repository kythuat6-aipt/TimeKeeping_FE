import { TYPE_KEEPING } from "utils/constants/config";
import { actionTimeKeeping, actionGetHistories } from "../actions";
import { AiptLogo } from "assets";

import {
  Button, Radio, Row, Col,
  Input, Spin, Form, DatePicker,
  Checkbox
} from "antd";

const TimeKepping = ({ setSpinning, spinning, setHistories}) => {
  const [form] = Form.useForm();

  const handleGetHistories = async () => {
    setSpinning(true);

    try {
      const { data, status } = await actionGetHistories();
      if (status === 200) {
        setHistories(data);
      }
    } catch (error) {
      console.log(error);
    }

    setSpinning(false);
  }

  const handleTimeKepping = async (values) => {
    setSpinning(true);

    try {
      const { data, status } = await actionTimeKeeping(values);
      if (status === 200) {
        setHistories(data?.timekeepings);
      }
    } catch (error) {
      console.log(error);
    }

    setSpinning(false);
  }

  return (
    <Spin spinning={spinning}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleTimeKepping}
        style={{
          width: "400px",
          maxWidth: "calc(100% - 20px)",
          margin: "0 auto"
        }}
      >
        <Form.Item>
          <img
            src={AiptLogo}
            style={{
              maxWidth: "80%",
              margin: "0 auto",
              display: "block"
            }}
          />
        </Form.Item>
        
        {/* <Form.Item name={"time-keeping"}>
          <DatePicker showTime />
        </Form.Item> */}

        <Form.Item name={"type-keeping"}>
          <Checkbox 
            onChange={(e) => {
              const value = e.target.checked ? Object.keys(TYPE_KEEPING)[0] : undefined;
              form.setFieldValue("type-keeping", value);
            }}
          >
            {Object.values(TYPE_KEEPING)[0]}
          </Checkbox>
        </Form.Item>

        <Form.Item name={"description"}>
          <Input.TextArea
            rows={4}
            placeholder="Nhập ghi chú"
          />
        </Form.Item>

        <Form.Item>
          <Row gutter={[8, 8]} justify="center">
            <Col>
              <Button type="primary"
                htmlType="submit"
              >
                Chấm công
              </Button>
            </Col>

            <Col>
              <Button onClick={handleGetHistories}>Lịch sử</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default TimeKepping;
