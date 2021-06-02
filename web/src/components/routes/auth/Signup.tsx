import React from 'react';

import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserContext } from '../../../contexts/UserContext';
import { RouteContent, FormContentMed } from '../../custom-styled-elements';

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

interface SignupCProps {
    sendFormData: Function;
}
const SignupC: React.SFC<SignupCProps> = (props: SignupCProps) => {
    const [form] = Form.useForm();
    const { sendFormData } = props;

    const onFinish = async (values: any) => {
        console.log('Wartosci formularza: ', values);
        await sendFormData(values.email, values.password);
    };

    return (
        <RouteContent>
            <FormContentMed>
                <Form {...layout} form={form} name="signup" onFinish={onFinish} scrollToFirstError>
                    <Form.Item
                        label="Email"
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                type: 'email',
                                message: 'Nieprawidłowy adres email',
                            },
                            {
                                required: true,
                                message: 'Wpisz swój email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hasło"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Wpisz swoje hasło',
                            },
                            {
                                min: 5,
                                message: 'Hasło musi mieć co najmniej 5 znaków',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Potwierdź hasło"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Potwierdź swoje hasło',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Hasła nie są takie same');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Wymagana zgoda')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            Przeczytałem i zgadzam się z <a href="https://google.com">regulaminem</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Rejestracja
                        </Button>
                        <Link to="/signin"> Logowanie</Link>
                    </Form.Item>
                </Form>
            </FormContentMed>
        </RouteContent>
    );
};

const SignupUserContextWrapped = () => {
    return (
        <UserContext.Consumer>
            {(context) => {
                const { signUp, isLoggedIn } = context;
                if (isLoggedIn) {
                    return <Redirect to="/" />;
                }
                const sendFormData = async (email: string, password: string) => {
                    console.log('Wyslano');
                    await signUp(email, password);
                };
                return <SignupC sendFormData={sendFormData} />;
            }}
        </UserContext.Consumer>
    );
};

export default SignupUserContextWrapped;
