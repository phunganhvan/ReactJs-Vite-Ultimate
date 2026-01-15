import { Button, Input, notification, Modal } from "antd"
import { useState } from "react"
import axios from "axios";
import { createUserAPI } from "../../services/api.services";

const UserForm = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { loadUser } = props;
    const handleSubmit = async () => {
        // alert("click me")
        const res = await createUserAPI(fullName, email, password, phoneNumber)
        if (res && res.data) {
            notification.success({
                message: "User created successfully",
                duration: 2,
                description: `User ${fullName} has been created.`
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

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const resetAndCloseModal = () => {
        // Reset form fields here if needed
        setIsModalOpen(false);
        setEmail("");
        setFullName("");
        setPassword("");
        setPhoneNumber("");
    }
    return (
        <>
            <div className="user-form" style={{ margin: "20px 0px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3> Table Users</h3>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}> Create User</Button>
                </div>

                <Modal
                    title="Create New User"
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
                                Full name:
                            </span>
                            <Input
                                value={fullName}
                                onChange={(e) => { setFullName(e.target.value) }}
                            />
                        </div>
                        <div>
                            <span>
                                Email:
                            </span>
                            <Input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div>
                            <span>
                                Password:
                            </span>
                            <Input.Password
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
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

            </div>

        </>
    )
}

export default UserForm;