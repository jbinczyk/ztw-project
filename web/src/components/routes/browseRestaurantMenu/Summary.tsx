import React from 'react';

import { Form, Button, Select } from 'antd';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

import { CartContext } from '../../../contexts/CartContext';
import ClientCartItemList from '../../ClientCartItemList';
const { Option } = Select;

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Summary: React.SFC = () => {
    const [form] = Form.useForm();

    return (
        <CartContext.Consumer>
            {(context) => {
                const { items, sendOrder } = context;

                let price = 0.0;
                for (const i of items) {
                    price = price + i.price;
                }

                if (items.length === 0) {
                    return <Redirect to="/history" />;
                }

                return (
                    <Main>
                        <Form {...layout} form={form} name="summary" onFinish={sendOrder} scrollToFirstError>
                            <Form.Item>
                                <h1>Podsumowanie zamówienia</h1>
                                {/* <MenuItemsInSummary items={items} /> */}
                                <ClientCartItemList />
                                {/* <h3>Łącznie do zapłaty:
                     {String(price)}
                </h3> */}
                            </Form.Item>
                            <Form.Item
                                name="paymentType"
                                label="Płatność"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Wybierz płatność"
                                    // onChange={onPaymentTypeChange}
                                    allowClear
                                >
                                    <Option value="karta">Karta</Option>
                                    <Option value="blik">Blik</Option>
                                    <Option value="przelew">Przelew</Option>
                                    <Option value="gotowka">Gotówka</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Zamawiam z obowiązkiem zapłaty
                                </Button>
                            </Form.Item>
                        </Form>
                    </Main>
                );
            }}
        </CartContext.Consumer>
    );
};

export default Summary;
