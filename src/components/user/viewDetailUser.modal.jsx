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
                // style={{display: "flex", flexDirection: "column", gap: "10px"}}
            >
                <div style={{margin: "10px"}}>
                    <p>ID: {dataDetail._id}</p>
                </div>
                <div style={{margin: "10px"}}>
                    <p>Full Name: {dataDetail.fullName}</p>
                </div >
                <div style={{margin: "10px"}}>
                    <p>Email: {dataDetail.email}</p>
                </div>
                <div style={{margin: "10px"}}>
                    <p>Phone: {dataDetail.phone}</p>
                </div>
            </Drawer>
        </>
    );
}

export default ViewDetailUserModal;