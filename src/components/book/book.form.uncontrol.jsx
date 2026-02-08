import { Form, Input, Select, Button, Modal, InputNumber, notification } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.services';
const BookFormUncontrol = (props) => {
    const [form] = Form.useForm();
    const handleUploadImg = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            console.log("No file selected");
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleSubmitBtn = async (values) => {
        if(!selectedFile){
            notification.error({
                message: "Please upload book thumbnail!",
                duration: 2
            });
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const thumbnail = resUpload.data.fileUploaded;
            //step 2: update user info with new avatar
            const resCreateBook = await createBookAPI(thumbnail, values.mainText, values.author, values.price, values.quantity, values.category);
            if (resCreateBook && resCreateBook.data) {
                setIsCreateModalOpen(false);
                setSelectedFile(null);
                form.resetFields();
                setPreview(null);
                // console.log("Create book successfully");
                await loadBooks();
                notification.success({
                    message: "Update user avatar successfully",
                    description: `Book created new avatar`
                });
            }
            else {
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resCreateBook.message)
                });
            }
        }
        else {
            //failed upload
            notification.error({
                message: "Upload avatar failed",
                description: JSON.stringify(resUpload.message)
            });
            return;
        }

    }
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsCreateModalOpen(false);
    }
    const { loadBooks, isCreateModalOpen, setIsCreateModalOpen } = props;
    const options =
        [
            { value: 'Arts', label: 'Arts' },
            { value: 'Business', label: 'Business' },
            { value: 'Comics', label: 'Comics' },
            { value: 'Cooking', label: 'Cooking' },
            { value: 'Entertainment', label: 'Entertainment' },
            { value: 'History', label: 'History' },
            { value: 'Music', label: 'Music' },
            { value: 'Sports', label: 'Sports' },
            { value: 'Teen', label: 'Teen' },
            { value: 'Travel', label: 'Travel' },
        ]

    return (
        <>
            <div className="user-form" style={{ margin: "20px 0px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3> Table Books</h3>
                    <Button type="primary" onClick={() => setIsCreateModalOpen(true)}> Create Book</Button>
                </div>
                <Modal
                    title="Create New Book (Uncontrolled Form)"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isCreateModalOpen}
                    onOk={() => form.submit()}
                    onCancel={resetAndCloseModal}
                    okText="Create Book"
                >
                    <Form
                        layout="vertical"
                        name="basic"
                        form={form}
                        onFinish={handleSubmitBtn}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="mainText"
                            rules={[{ required: true, message: 'Please input book title!' }]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tác giả"
                            name="author"
                            rules={[{ required: true, message: 'Please input book author!' }]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Please input book price!' }]}
                            hasFeedback

                        >
                            <InputNumber style={{ width: "100%" }} addonAfter={'đ'} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Please input book quantity!' }]}
                            hasFeedback
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Thể loại"
                            name="category"
                            rules={[{ required: true, message: 'Please select book category!' }]}
                            hasFeedback
                        >
                            <Select
                                style={{ width: "100%" }}
                                options={options}
                            />
                        </Form.Item>

                        <div>
                            <div>
                                Thumbnail:
                            </div>

                            <div>
                                <label htmlFor='btnUpload'
                                    style={{
                                        display: "block",
                                        width: "fit-content",
                                        marginTop: "15px",
                                        padding: "5px 10px",
                                        background: "lightblue",
                                        borderRadius: "8px",
                                        cursor: "pointer"

                                    }}
                                >
                                    Upload Thumbnail
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    hidden
                                    id='btnUpload'
                                    onChange={handleUploadImg}
                                    style={{ display: "none" }}
                                    onClick={(event) => {
                                        event.target.value = null
                                    }}
                                />
                            </div>
                            {preview &&
                                <>
                                    <div style={{ marginTop: "10px", height: "125px", width: "150px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                        <img
                                            style={{ objectFit: "contain" }}
                                            height={"100%"} width={"100%"}
                                            src={`${preview}`}
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </Form >
                </Modal>
            </div>
        </>
    );
}
export default BookFormUncontrol;
