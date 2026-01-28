import { Button, Input, Form } from "antd"
const RegisterPage = () => {
    const [form]= Form.useForm();
    const onFinish = (value) => {
        console.log("Success:", value);
    }
    return (
        <>
            <Form
                layout="vertical"
                name="basic"
                form={form}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{ margin: "50px" }}>
                    <Form.Item
                        label="Fullname"
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div>
                        <Button 
                        type="primary" 
                        // htmlType="submit" nhu nhau
                        onClick={() => form.submit()}
                    >
                        Register
                    </Button>
                    </div>
                </div>
            </Form>
        </>
    )
};
export default RegisterPage;