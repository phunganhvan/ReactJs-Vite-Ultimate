import { Button, Drawer } from 'antd';
import { useState } from 'react';
const ViewDetailUserModal = (props) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail, setDataDetail } = props;
    // console.log("dataDetail: ", dataDetail);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const onClose = () => {
        setIsDetailModalOpen(false);
        setDataDetail({});
    };
    const handleChangeAvatar = (event) => {
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
        console.log("Selected file: ", file);
        // handle file upload logic here
    }
    return (
        <>
            <Drawer
                title="Detail User Information"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={isDetailModalOpen}
                width={"30vw"}
            // style={{display: "flex", flexDirection: "column", gap: "10px"}}
            >
                <div style={{ margin: "10px" }}>
                    <p>ID: {dataDetail._id}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Full Name: {dataDetail.fullName}</p>
                </div >
                <div style={{ margin: "10px" }}>
                    <p>Email: {dataDetail.email}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Phone: {dataDetail.phone}</p>
                </div>
                <p style={{ margin: "10px" }}>Avatar:</p>
                <div style={{ marginTop: "10px", height: "125px", width: "150px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <img
                        style={{ objectFit: "contain" }}
                        height={"100%"} width={"100%"}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                    />
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
                        Upload Avatar
                    </label>
                    <input type="file" name="avatar" hidden id='btnUpload' onChange={handleChangeAvatar} />
                </div>
                {preview &&
                    <div style={{ marginTop: "10px", height: "125px", width: "150px", border: "1px solid #ccc", borderRadius: "8px" }}>
                        <img
                            style={{ objectFit: "contain" }}
                            height={"100%"} width={"100%"}
                            src={`${preview}`}
                        />
                    </div>}
            </Drawer>
        </>
    );
}

export default ViewDetailUserModal;