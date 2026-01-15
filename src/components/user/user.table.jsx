import { Space, Table, Tag } from "antd";




const UserTable = (props) => {
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
        }
    ];
    // lift - up state
    const { dataUsers } = props;
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey="_id"/>
        </>
    );
}

export default UserTable;