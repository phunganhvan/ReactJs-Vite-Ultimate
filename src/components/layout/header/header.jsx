import { Link, NavLink } from 'react-router-dom';
import { UsergroupAddOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        // navigator(`/${e.key}`);
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
            // disabled: true,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
            // children: [
            //     {
            //         type: 'group',
            //         label: 'Item 1',
            //         children: [
            //             { label: 'Option 1', key: 'setting:1' },
            //             { label: 'Option 2', key: 'setting:2' },
            //         ],
            //     },
            //     {
            //         type: 'group',
            //         label: 'Item 2',
            //         children: [
            //             { label: 'Option 3', key: 'setting:3' },
            //             { label: 'Option 4', key: 'setting:4' },
            //         ],
            //     },
            // ],
        },
        // {
        //     key: 'alipay',
        //     label: (
        //         <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        //             Navigation Four - Link
        //         </a>
        //     ),
        // },
    ];
    
    return (
        <>

            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
            {/* <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/users">User</NavLink></li>
                <li><NavLink to="/books">Book</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </ul> */}
        </>
    );
}
export default Header;