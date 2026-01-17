import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatar } from '../../services/api.services';
const ViewDetailUserModal = (props) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail, setDataDetail, loadUser } = props;
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
        // console.log("Selected file: ", file);
        // handle file upload logic here
    }
    const handleUpdateAvatar = async () => {
        // step 1 : upload file to server
        // event.preventDefault();
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update user info with new avatar
            const resUpdateUser = await updateUserAvatar(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if (resUpdateUser && resUpdateUser.data) {
                setIsDetailModalOpen(false);
                setPreview(null);
                setDataDetail({});
                setSelectedFile(null);
                await loadUser();
                notification.success({
                    message: "Update user avatar successfully",
                    description: `User: ${dataDetail.fullName} updated with new avatar`
                });
            }
            else {
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUpdateUser.message)
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
                    <>
                        <div style={{ marginTop: "10px", height: "125px", width: "150px", border: "1px solid #ccc", borderRadius: "8px" }}>
                            <img
                                style={{ objectFit: "contain" }}
                                height={"100%"} width={"100%"}
                                src={`${preview}`}
                            />
                        </div>
                        <Button
                            type='primary'
                            onClick={() => handleUpdateAvatar()}
                        >
                            Save
                        </Button>
                    </>
                }
            </Drawer>
        </>
    );
}

export default ViewDetailUserModal;