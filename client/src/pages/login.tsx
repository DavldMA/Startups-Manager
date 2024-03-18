import 'antd/dist/reset.css';
import '../App.css';
import { Button, Form, FormProps, Input, message } from 'antd';
import { login } from "../services/userAuthService";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  let navigate: NavigateFunction = useNavigate();
  const { setIsLoggedIn } = useUser();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  
    try {
        const value: any = await login(values);
        if (value == null) {
          setIsLoggedIn(true);
          navigate("/");
        }
        error(value)
    } catch {
      error("Error while trying to fecth the data")
    }
  };


  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    error("Error while trying to submit the forms")
  };

  return (
    <div>
      {contextHolder}
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 500, minWidth:10 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;