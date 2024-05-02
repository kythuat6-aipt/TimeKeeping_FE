import { TYPE_KEEPING } from "utils/constants/config";
import { Button, Radio, Row, Col, Input, Form, message, Spin } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { actionTimeKeeping } from "./actions";
import { AiptLogo } from "assets";
import '../../components/Layout/sider/index.scss'
const Keeping = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [listTimeKeeping, setListTimeKeeping] = useState([]);
    const [text, setText] = useState("")
    const [spining, setSpinning] = useState(false)

    const handleClick = (value) => {
        if (selectedValue === value) {
            setSelectedValue(null);
        } else {
            setSelectedValue(value);
        }
    };


    const handleTimeKepping = async () => {
        setSpinning(true)
        try {

            const params = {
                time_keeping: dayjs().unix(),
                type_keeping: selectedValue || null,
                description: text || null,
            };

            const { data, status } = await actionTimeKeeping(params)
            if (status == 200) {
                message.success(data?.message)

                setListTimeKeeping(data?.list_keeping_time)
                window.navigatePage('historyTime')

            }

        } catch (error) {
            console.log(error);
        }
        setSpinning(false)
    }

    return (
        <Spin spinning={spining}>
            <div>
                <Row gutter={[16, 16]}>
                    <div className="app-sider--logo2">
                        <img src={AiptLogo} alt="logo" />
                    </div>
                    <Col span={24}>
                        <Radio.Group className="w-full" value={selectedValue} >
                            <Row gutter={[4, 12]} >
                                {Object.keys(TYPE_KEEPING).map((key) =>
                                    <Col key={key} md={8} xs={8}>
                                        <Radio value={key} onClick={() => handleClick(key)}>
                                            {TYPE_KEEPING[key]}
                                        </Radio>
                                    </Col>
                                )}
                            </Row>
                        </Radio.Group>

                    </Col>

                    <Col span={24}>
                        <Input.TextArea rows={3} placeholder="Ghi chú"
                            onChange={e => setText(e.target.value)}
                            value={text}
                        />
                    </Col>
                </Row>


                <Row gutter={[16, 0]} justify={"center"} style={{ marginTop: "16px" }}>
                    <Col>
                        <Button type="primary"
                            onClick={handleTimeKepping}
                        >
                            Chấm Công
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => window.navigatePage("historyTime")} >
                            Lịch sử
                        </Button>
                    </Col>
                </Row>
            </div>
        </Spin>



    );
};

export default Keeping;
