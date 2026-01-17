import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import UpdateUserModal from "./updateUser.modal";
import { useState } from "react";
import ViewDetailUserModal from "./viewDetailUser.modal";
import { message, Popconfirm } from 'antd';
import { deleteUserAPI } from "../../services/api.services";
const UserTable = (props) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    // lift - up state
    const { dataUsers, loadUser } = props;
    // delete
    const confirm = async (record) => {
        // console.log(e);
        // message.success('Click on Yes', record);
        const res= await deleteUserAPI(record);
        if(res && res.data){
            message.success(`User id ${record} deleted successfully`);
            await loadUser();
        }
        else{
            message.error(`User id ${record} deletion failed: ${JSON.stringify(res.message)}`);
        }
    };
    const cancel = e => {
        console.log(e);
        message.error('Click on No');
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => {
                return (
                    <a
                        href="#"
                        onClick={() => { setIsDetailModalOpen(true); setDataDetail(record); }}
                    >
                        {record._id}
                    </a>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
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
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => confirm(record._id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                            </Popconfirm>

                        </div>
                    </>
                );
            }

            ,
        }
    ];
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
            <ViewDetailUserModal
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
}

export default UserTable;