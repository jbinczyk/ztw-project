import React from "react"

import { Redirect, Link } from "react-router-dom"
import { Form, Input, Button } from 'antd';
import { UserContext } from "../../../contexts/UserContext"
import { RouteContent, FormContentMed } from "../../custom-styled-elements";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

interface SigninCProps {
  sendFormData: Function
}
const SigninC: React.SFC<SigninCProps> = (props: SigninCProps) => {

  const [form] = Form.useForm();
  const { sendFormData } = props

  const onFinish = async (values: any) => {
    console.log('Wartosci formularza: ', values)
    await sendFormData(values.email, values.password)
  };

  return (
    <RouteContent>
      <FormContentMed>
        <Form
          {...layout}
          form={form}
          name="signin"
          onFinish={onFinish}
          scrollToFirstError
        >
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
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Zaloguj
          </Button>
            <Link to="/signup"> Rejestracja</Link>
          </Form.Item>
        </Form>
      </FormContentMed>

    </RouteContent>
  )
}



const SigninUserContextWrapped = () => {
  return (
    <UserContext.Consumer>{(context) => {
      const { signIn, isLoggedIn } = context
      if (isLoggedIn) {
        return (
          <Redirect to="/" />
        )
      }
      const sendFormData = async (email: string, password: string) => {
        console.log("Wyslano")
        await signIn(email, password)
      }
      return (
        <SigninC sendFormData={sendFormData} />
      )
    }}
    </UserContext.Consumer>
  )
}

export default SigninUserContextWrapped