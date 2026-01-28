import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllUsersAPI } from "./../services/api.services";
const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        loadUser();
    }, [current, pageSize]) // condition
    const loadUser = async () => {
        const res = await fetchAllUsersAPI(current, pageSize);
        if(res.data){
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
            setDataUsers(res.data.result);
        }
        // console.log("dataUsers: ", res.data);
    }
    return (
        <>
            <div style={{ padding: "20px" }}>
                <UserForm loadUser={loadUser} />
                <UserTable 
                    dataUsers={dataUsers} 
                    loadUser={loadUser} 
                    current={current} 
                    pageSize={pageSize} 
                    total={total} 
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </>
    )
}
export default UserPage;