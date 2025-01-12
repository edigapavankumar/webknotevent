import { useState } from "react";
import WelcomeContent from "../common/welcome";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api-service/users-service";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 lg:flex hidden">
        <WelcomeContent />
      </div>
      <div className="h-screen flex items-center justify-center">
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-gray-600">
            Register your account
          </h1>
          <Form.Item
            name="name"
            label="Name"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
          <Link to="/login">Already have an Acount? Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
