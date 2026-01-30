import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Navigate } from "react-router-dom";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
const PrivateRoute = (props) => {
    const {user} = useContext(AuthContext);
    if(user && user.id){
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <>
            <Result
            status="403"
            title="Unauthorized!"
            subTitle="You do not have permission to access this page. You need to log in first."
            extra={<Button type="primary">
                <Link to="/">Back To Home Page</Link>
            </Button>}
        />
        </>
    );
}
export default PrivateRoute;