import { Form, Modal, Input, InputNumber, Select, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { updateBookAPI } from "../../services/api.services";
import { handleUploadFile } from "../../services/api.services";

const UpdateBookUncontrol = (props) => {
    const [form] = Form.useForm();

    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, loadBooks } = props;
    const [preview, setPreview] = useState();
    const [selectedFile, setSelectedFile] = useState();
    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            const { _id, mainText, author, price, quantity, category, thumbnail
            } = dataUpdate;
            form.setFieldsValue({
                _id: _id,
                mainText: mainText,
                author: author,
                price: price,
                quantity: quantity,
                category: category,
            });
            if (thumbnail) setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate]);
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
    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsUpdateModalOpen(false);
        setDataUpdate({});
    }
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
        // Implement the update book logic here, similar to createBookAPI
        // step 1 : upload file to server
        const { _id, mainText, author, price, quantity, category } = values;
        if (!preview && !selectedFile) {
            notification.error({
                message: "Thumbnail is required",
                duration: 2,
            });
            return;
        }
        let newThumbnail;
        if (!selectedFile && preview) {
            // no change thumbnail
            setSelectedFile(null);
            newThumbnail = dataUpdate.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;
            }
            else {
                notification.error({
                    message: "Thumbnail upload failed",
                    duration: 2,
                });
                return;
            }
        }

        const res = await updateBookAPI(_id, newThumbnail, mainText, author, price, quantity, category);
        if (res && res.data) {
            // success
            notification.success({
                message: "Book updated successfully",
                duration: 2,
                description: `Book ${_id} has been updated.`
            });
            resetAndCloseModal();
            await loadBooks();
        }
        else {
            notification.error({
                message: "Book UPDATE failed",
                duration: 2,
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Modal
                title="Update Book (Uncontrolled Form)"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                okText="Update Book"
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
                        label="Id"
                        name="_id"
                    >
                        <Input disabled />
                    </Form.Item>
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
        </>
    );
}
export default UpdateBookUncontrol;