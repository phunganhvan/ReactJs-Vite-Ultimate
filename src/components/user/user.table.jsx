import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import UpdateUserModal from "./updateUser.modal";
import { useState } from "react";

const UserTable = (props) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <EditOutlined
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => {
                                    setDataUpdate(record);
                                    setIsUpdateModalOpen(true);
                                }}
                            />
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </div>
                    </>
                );
            }

            ,
        }
    ];
    // lift - up state
    const { dataUsers, loadUser } = props;
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey="_id" />
            <UpdateUserModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;