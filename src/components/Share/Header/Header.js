import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogOut = () => {
        logout()
            .then()
            .catch()
    }

    const menuItems = <>

        {
            user?.email ?
                <>
                    <Link to='/login' className="btn btn-ghost">{user?.displayName}</Link>
                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>

                </>

                :
                    <>
                        <Link to='/login' className="btn btn-ghost">log in</Link>
                        <Link to='/register' className="btn btn-ghost">Register</Link>
                    </>
                }
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">

                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/download'>Download</Link></li>
                        <li><Link to='/upload'>Upload</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                    </ul>
                </div>
                <button className="btn btn-ghost normal-case text-xl">Rs Ruh</button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/download'>Download</Link></li>
                    <li><Link to='/upload'>Upload</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {menuItems}
            </div>
        </div>
    );
};

export default Header;