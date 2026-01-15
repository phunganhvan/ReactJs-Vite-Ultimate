import { Button, Input } from "antd"
import { useState } from "react"
import axios from "axios";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleSubmit = (e) => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phoneNumber
        }
        axios.post(URL_BACKEND, data)
            .then((response) => {
                console.log("User created successfully:", response.data);
            })
            .catch((error) => {
                console.error("There was an error creating the user!", error);
            });
        // Handle form submission logic here
        
    }
    return (
        <>
            <div className="user-form" style={{margin: "20px 0px"}}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column"}}>
                    <div>
                        <span>
                            Full name:
                        </span>
                        <Input 
                            value={fullName}
                            onChange={(e) => { setFullName(e.target.value)}}
                        /> 
                    </div>
                    <div>
                        <span>
                            Email:
                        </span>
                        <Input 
                            value={email}
                            onChange={(e) => { setEmail(e.target.value)}}
                        /> 
                    </div>
                    <div>
                        <span>
                            Password:
                        </span>
                        <Input.Password 
                            value={password}
                            onChange={(e) => { setPassword(e.target.value)}}
                        /> 
                    </div>
                    <div>
                        <span>
                            Phone number:
                        </span>
                        <Input 
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value)}}
                        /> 
                    </div>
                    <div>
                        <Button type="primary" onClick={() => handleSubmit()}> Create User</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForm;