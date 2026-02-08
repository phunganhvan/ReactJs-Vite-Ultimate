import { useEffect, useState } from 'react';
import { Input, Modal, InputNumber, Select, notification } from 'antd';
import { updateBookAPI } from '../../services/api.services';
import { handleUploadFile } from '../../services/api.services';
const UpdateBookControl = (props) => {

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState()
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const {
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        dataUpdate,
        setDataUpdate,
        loadBooks
    } = props;

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            const {
                _id, mainText, author, price, quantity, category, thumbnail
            } = dataUpdate;
            setId(_id);
            setMainText(mainText);
            setAuthor(author);
            setPrice(price);
            setQuantity(quantity);
            setCategory(category);
            if (thumbnail) setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)


        }
    }, [dataUpdate]);
    const resetAndCloseModal = () => {
        setId();
        setMainText();
        setAuthor();
        setPrice();
        setQuantity();
        setCategory();
        setPreview();
        setSelectedFile();
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
        // console.log("Selected file: ", file);
        // handle file upload logic here
    }

    const handleSubmit = async () => {

        // Implement the update book logic here, similar to createBookAPI
        // step 1 : upload file to server
        // event.preventDefault();
        if(!preview && !selectedFile){
            notification.error({
                message: "Thumbnail is required",
                duration: 2,
            });
            return;
        }
        let newThumbnail;
        if(!selectedFile && preview){
            // no change thumbnail
            setSelectedFile(null);
            newThumbnail = dataUpdate.thumbnail;
        }else{
            const resUpload = await handleUploadFile(selectedFile, "book");
            if(resUpload.data){
                //success
                newThumbnail = resUpload.data.fileUploaded;
            }
            else{
                notification.error({
                    message: "Thumbnail upload failed",
                    duration: 2,
                });
                return;
            }
        }
        
        const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
        if (res && res.data) {
            // success
            notification.success({
                message: "Book updated successfully",
                duration: 2,
                description: `Book ${id} has been updated.`
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
    const handleChangeCategory = (value) => {
        setCategory(value);
    }
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

            <Modal
                title="Create New Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isUpdateModalOpen}
                onOk={() => handleSubmit()}
                onCancel={resetAndCloseModal}
                maskClosable={false}
                okText="UPDATE"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>
                            Id
                        </span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
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
                            addonAfter={'đ'}
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
                            value={category}
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
                            accept="image/*"
                            hidden
                            id='btnUpload'
                            onChange={handleUploadImg}
                            onClick={(event) => {
                                event.target.value = null;
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
        </>
    );
}

export default UpdateBookControl;