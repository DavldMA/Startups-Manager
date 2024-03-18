import { EnterOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, OrderedListOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Drawer } from 'antd';
import 'antd/dist/reset.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import '../App.css';
import { useUser } from "../context/userContext";
import images from '../logo.svg'

import Logout from './logout'
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Startup from '../pages/startups';
import Register from '../pages/register';
import Favorito from '../pages/favoritos';
import NotFoundPage from './notFoundPage';


let itemsUnLogged = [
    {
        label:'Home',
        icon: <HomeOutlined />,
        key:'/',
    },
    {
        label:'Login',
        icon: <LoginOutlined />,
        key:'/login',
    },
    {
        label:'Register',
        icon: <EnterOutlined />,
        key:'/register',
    },

]

let itemsLogged = [
    {
        label:'Home',
        icon: <HomeOutlined />,
        key:'/',
    },
    {
        label:'Startup',
        icon: <OrderedListOutlined />,
        key:'/startup',
    },
    {
        label:'Favorito',
        icon: <StarOutlined />,
        key:'/favoritos',
    },
    {
        label: "Profile", 
        key: '/profile', 
        icon: <UserOutlined />
    },
    {
        label: "Logout", 
        key: '/logout', 
        icon: <LogoutOutlined />,
        danger: true
    },
]

function NavBar() {
    const [openMenu, setOpenMenu] = useState(false);
    const { isLoggedIn } = useUser();

    const menuItems = isLoggedIn ? itemsLogged : itemsUnLogged;
    return (
        <div style={{ height: '100vh', backgroundColor: 'white' }}>
            <div className='menuIcon' style={{ backgroundColor: 'white', height: 60, paddingLeft: 12, paddingTop: 12 }}>
                <MenuOutlined style={{ color: "black", fontSize: 30, float: 'left' }} onClick={() => {
                    setOpenMenu(true);
                }} />
            </div>
            <div className='contentContainer'>
                <span className='headerMenu'>
                    <img alt="" src={images} style={{backgroundColor: 'white', height: 40, float: "left", marginTop: 4}}></img>
                    <AppMenu items={menuItems} />
                </span>
                <span className='sideMenu'>
                    <Drawer open={openMenu} onClose={() => { setOpenMenu(false); }} closable={false} style={{ backgroundColor: 'white', fontSize: 24, border: "none"}}>
                        <img alt="" src={images} style={{backgroundColor: 'white', height: 50,float: "right"}}></img>
                        <AppMenu items={menuItems} isInline />
                    </Drawer>
                </span>
            </div>
            <br></br>
            <br></br>
            <Content />
        </div>);
}

interface AppMenuProps {
    items: any[];
    isInline?: boolean;
}

const AppMenu: React.FC<AppMenuProps> = ({ items = [], isInline = false }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (key: string) => {
        return location.pathname === key;
    };

    return (
        <div className="menu">
            <Menu
                onClick={({ key }) => navigate(key)}
                selectedKeys={[location.pathname]} 
                style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                mode={isInline ? "inline" : "horizontal"}
            >
                {items.map((item) => (
                    <Menu.Item key={item.key} icon={item.icon} style={isActive(item.key) ? { fontWeight: 'bold' } : {}}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

function Content() {
    const { isLoggedIn } = useUser();

    const renderRoutes = () => {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                {isLoggedIn && <Route path="/startup" element={<Startup />} />}
                {isLoggedIn && <Route path="/favoritos" element={<Favorito />} />}
                {isLoggedIn && <Route path="/profile" element={<Profile />} />}
                {isLoggedIn && <Route path="/logout" element={<Logout />} />}
                {!isLoggedIn && <Route path="/login" element={<Login />} />}
                {!isLoggedIn && <Route path="/register" element={<Register />} />}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        );
    } 
    return <div>{renderRoutes()}</div>;
};




export default NavBar;
