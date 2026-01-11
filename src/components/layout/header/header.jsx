import { NavLink } from 'react-router-dom';
import './header.css'
const Header = () => {
    return (
        <>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/users">User</NavLink></li>
                <li><NavLink to="/books">Book</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </ul>
        </>
    );
}
export default Header;