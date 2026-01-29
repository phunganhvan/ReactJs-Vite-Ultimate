import { Button, Input, Form, notification, Row, Col, Divider } from "antd"
import { registerUserAPI } from "../services/api.services";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (value) => {
        console.log("Success:", value);
        // call API
        const res = await registerUserAPI(
            value.fullname,
            value.email,
            value.password,
            value.phone
        );
        if (res.data) {
            notification.success({
                message: "Register successfully!",
                description: `Welcome ${res.data.fullName}!`,
                duration: 3
            });
            form.resetFields();
            navigate("/login");
        }
        else {
            notification.error({
                message: "Register failed!",
                description: res.message || "Something went wrong!",
                duration: 3
            });
        }
        console.log("res register: ", res);
    }
    return (
        <>
            <Form
                layout="vertical"
                name="basic"
                labelAlign="Đăng kí"
                form={form}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <h2 style={{ textAlign: "center" }}>Register Account</h2>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Form.Item
                            label="Fullname"
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{

                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            { required: true, message: 'Please input your email!' }]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                {
                                    // required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={6}>
                        <Button
                            type="primary"

                            // htmlType="submit" nhu nhau
                            onClick={() => form.submit()}
                        >
                            Register
                        </Button>
                    </Col>
                </Row>
                <Divider dashed />
                <Row justify={"center"} style={{ marginTop: "10px" }}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <span>Have an account? </span>
                        <Button type="link" onClick={() => navigate("/login")}>Login here</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
};
export default RegisterPage;