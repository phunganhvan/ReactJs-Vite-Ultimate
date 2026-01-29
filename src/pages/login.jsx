import { Button, Input, Form, notification, Row, Col, Divider, message } from "antd"
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import { loginAPI } from "../services/api.services";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const onFinish = async (value) => {
        // console.log("Success:", value);
        // call API
        setLoading(true);
        const res= await loginAPI(value.email, value.password);
        // console.log("res login:", res);
        if( res.data ){
            // console.log(res);
            message.success(`Welcome back ${res.data.user.fullName}!`);
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);git 
            form.resetFields();
            navigate("/");
        }
        else {
            notification.error({
                message: "Login failed!",
                description: res.message || "Something went wrong!",
                duration: 3
            });
        }
        setLoading(false);
    }
    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8} >
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend> Login</legend>
                        <Form
                            layout="vertical"
                            name="basic"
                            labelAlign="login"
                            form={form}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row justify={"center"}>
                                <Col xs={24} sm={24}>
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
                                <Col xs={24} sm={24}>
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
                            <Row>
                                <Col xs={24} sm={12}>
                                    <Button
                                        type="primary"
                                        loading={loading}
                                        // htmlType="submit" same as below
                                        onClick={() => form.submit()}
                                    >
                                        Login
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Link to="/" style={{ float: "right" }}>Go to HomePage <ArrowRightOutlined /></Link>
                                </Col>
                            </Row>
                            <Divider dashed />
                            <Row justify={"center"}>
                                <Col xs={24} sm={24} style={{ textAlign: "center" }}>
                                    <span>Don`t have an account? </span>
                                    <Link to="/register" >Register here</Link>
                                </Col>
                            </Row>
                        </Form>
                    </fieldset>
                </Col>
            </Row>

        </>
    )
}
export default LoginPage;