import { Button, Input } from "antd"


const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleSubmit = (e) => {
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