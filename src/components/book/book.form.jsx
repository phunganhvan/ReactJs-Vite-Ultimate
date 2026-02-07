import { Modal, Input, InputNumber, notification, Select, Button } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.services';

const BookForm = (props) => {
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const { loadBooks } = props;
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
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCancel = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setSelectedFile();
        setPreview();
        setIsModalOpen(false);
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
        // console.log("Selected file: ", file);
        // handle file upload logic here
    }
    const handleSubmit = async () => {
        // console.log("Create book", e);
        // console.log(mainText, author, price, quantity, category, selectedFile);
        // step 1 : upload file to server
        // event.preventDefault();
        if (!selectedFile) {
            notification.error({
                message: "Please select a thumbnail",
                duration: 2,
            });
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const thumbnail = resUpload.data.fileUploaded;
            //step 2: update user info with new avatar
            const resCreateBook = await createBookAPI(thumbnail, mainText, author, price, quantity, category);
            if (resCreateBook && resCreateBook.data) {
                setIsModalOpen(false);
                setSelectedFile(null);
                setMainText("");
                setAuthor("");
                setPrice("");
                setQuantity("");
                setSelectedFile(null);
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
    const handleChangeCategory = (value) => {
        setCategory(value);
    }


    return (
        <>
            <div className="user-form" style={{ margin: "20px 0px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3> Table Books</h3>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}> Create Book</Button>
                </div>
                <Modal
                    title="Create New Book"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => handleSubmit()}
                    onCancel={handleCancel}
                    maskClosable={false}
                    okText="CREATE"
                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>
                                Tiêu đề:
                            </span>
                            <Input
                                value={mainText}
                                onChange={(e) => { setMainText(e.target.value) }}
                            />
                        </div>
                        <div>
                            <span>
                                Tác giả:
                            </span>
                            <Input
                                value={author}
                                onChange={(e) => { setAuthor(e.target.value) }}
                            />
                        </div>
                        <div>
                            <div>
                                Giá tiền:
                            </div>
                            <InputNumber
                                // formatter={value => `${value}đ`}
                                // parser={value => value?.replace('%', '')}
                                addonAfter = {'đ'}
                                style={{ width: "100%" }}
                                value={price}
                                onChange={(e) => { setPrice(e) }}
                            />
                        </div>
                        <div>
                            <div>
                                Số lượng:
                            </div>
                            <div>
                                <InputNumber style={{ width: "100%" }}
                                    value={quantity}
                                    onChange={(e) => { setQuantity(e) }}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                Thể loại:
                            </div>
                            <Select
                                defaultValue="Select Category"
                                style={{ width: "100%" }}
                                onChange={handleChangeCategory}
                                options={options}
                            />
                        </div>
                        <div>
                            <span>
                                Thumbnail:
                            </span>
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
                </Modal>
            </div>
        </>
    );
}

export default BookForm;