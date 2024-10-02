import { TYPE_KEEPING } from "utils/constants/config";
import { actionTimeKeeping, actionGetHistories } from "../actions";
import { useState } from "react";
import { AiptLogo } from "assets";

import {
  Button, Row, Col, Input,
  Spin, Form, Checkbox
} from "antd";

const TimeKepping = ({ setSpinning, spinning, setHistories }) => {
  const [form] = Form.useForm();
  const [typeKeeping, setTypeKeeping] = useState();

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
      const req_data = { 
        ...values, 
        type_keeping: typeKeeping 
      };
      
      const { data, status } = await actionTimeKeeping(req_data);
      if (status === 200) {
        setHistories(data?.timekeepings);
      }
    } catch (error) {
      console.log(error);
    }

    setSpinning(false);
  }

  const checkboxOptions = Object.keys(TYPE_KEEPING)
    .filter(key => !["1", "2"].includes(key))
    .map(key => ({
      label: TYPE_KEEPING[key],
      value: parseInt(key)
    }))

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

        <Form.Item>
          {checkboxOptions.map(checkbox => (
            <Checkbox 
              key={checkbox.value} 
              value={checkbox.value}
              checked={typeKeeping == checkbox.value}
              onChange={(e) => 
                e.target.checked ? setTypeKeeping(e.target.value) : setTypeKeeping(null)
              }
            >
              {checkbox.label}
            </Checkbox>
          ))}
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
