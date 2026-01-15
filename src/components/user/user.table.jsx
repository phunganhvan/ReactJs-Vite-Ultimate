import { Space, Table, Tag } from "antd";
import { fetchAllUsersAPI } from "../../services/api.services";
import { useState } from "react";
import { useEffect } from "react";


const UserTable = () => {
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
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        setDataUsers(res.data);
        // console.log("dataUsers: ", res.data);
    }
    // console.log("rerender")
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey="_id"/>
        </>
    );
}

export default UserTable;