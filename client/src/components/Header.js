import React, { useState, useEffect } from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import UserApi from '../api/user';

function Header() {
    const [currentUser, setCurrentUser] = useState();

    
    useEffect(() => {
        const user = UserApi.getCurrentUser();
        user.then(value => {
            setCurrentUser(value);
          }).catch(err => {
            console.log(err);
          });
    }, []);
    
    const logout = () => {
        UserApi.logout();
    };

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Hinshaw Expense</Link>
        </div>
        <ul>
            {currentUser === null ? (
                <div>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </div>
            ) : (
                <div>
                    <li>
                        <a href="/" onClick={logout}>
                            <FaSignOutAlt /> Logout
                        </a>
                    </li>
                </div>
            )}
        </ul>
    </header>
  )
}

export default Header