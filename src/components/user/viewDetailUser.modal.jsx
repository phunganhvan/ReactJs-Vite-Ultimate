import { Button, Drawer } from 'antd';
const ViewDetailUserModal = (props) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail, setDataDetail } = props;
    // console.log("dataDetail: ", dataDetail);
    const onClose = () => {
        setIsDetailModalOpen(false);
        setDataDetail({});
    };
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
                <div>
                    <p style={{ margin: "10px" }}>Avatar:</p>
                    <img
                        style={{ margin: "10px", borderRadius: "8px", border: "1px solid #ccc", objectFit: "cover" }}
                        height={"250px"} width={"300px"}
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
                    <input type="file" name="avatar" hidden id='btnUpload'/>
                </div>
            </Drawer>
        </>
    );
}

export default ViewDetailUserModal;