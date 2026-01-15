import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllUsersAPI } from "./../services/api.services";
const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        setDataUsers(res.data);
        // console.log("dataUsers: ", res.data);
    }
    return (
        <>
            <div style={{ padding: "20px" }}>
                <UserForm loadUser={loadUser} />
                <UserTable dataUsers={dataUsers} />
            </div>
        </>
    )
}
export default UserPage;