import { Modal, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.services";
const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const {isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, loadUser} = props;

    useEffect(() => {
        // console.log("dataUpdate: ", dataUpdate);
        if (dataUpdate && dataUpdate.email) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            // setPassword(dataUpdate.password);
            setPhoneNumber(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        // setDataUpdate({});
    };
    const resetAndCloseModal = () => {
        // Reset form fields here if needed
        setIsUpdateModalOpen(false);
        setFullName("");
        setId("");
        setPhoneNumber("");
    }
    const handleSubmit = async () => {
        // alert("click me")
        const res = await updateUserAPI(id, fullName, phoneNumber)
        if (res && res.data) {
            notification.success({
                message: "User updated successfully",
                duration: 2,
                description: `User ${id} has been updated.`
            });
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "User creation failed",
                duration: 2,
                description: JSON.stringify(res.message)
            })
        }
        // Handle form submission logic here

    }
    return (
        <>
            <Modal
                title="Update A User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isUpdateModalOpen}
                onOk={() => handleSubmit()}
                onCancel={handleCancel}
                maskClosable={false}
                okText="UPDATE"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>
                            Id:
                        </span>
                        <Input
                            value={id}
                            onChange={(e) => { setId(e.target.value) }}
                            disabled
                        />
                    </div>
                    <div>
                        <span>
                            Full name:
                        </span>
                        <Input
                            value={fullName}
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                    </div>
                    <div>
                        <span>
                            Phone number:
                        </span>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateUserModal;