import { Drawer, Button } from 'antd';
import { useState } from 'react';

const DetailBookModal = (props) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail, setDataDetail } = props;
    const onClose = () => {
        setIsDetailModalOpen(false);
        setDataDetail({});
    };
    return (
        <>
            <Drawer
                title="Detail Book Information"
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
                    <p>Tiêu đề: {dataDetail.mainText}</p>
                </div >
                <div style={{ margin: "10px" }}>
                    <p>Tác giả: {dataDetail.author}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Thể loại: {dataDetail.category}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Giá tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Số lượng: {dataDetail.quantity}</p>
                </div>
                <div style={{ margin: "10px" }}>
                    <p>Đã bán: {dataDetail.sold}</p>
                </div>
                <p style={{ margin: "10px" }}>Thumbnail:</p>
                <div style={{ marginTop: "10px", height: "125px", width: "150px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <img
                        style={{ objectFit: "contain" }}
                        height={"100%"} width={"100%"}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
                    />
                </div>
                {/* <div>
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
                            // onClick={() => handleUpdateAvatar()}
                        >
                            Save
                        </Button>
                    </>
                } */}
            </Drawer>
        </>
    )
}
export default DetailBookModal;