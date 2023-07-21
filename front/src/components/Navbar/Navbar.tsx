import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../DesignSystem/Button/Button';
import './Navbar.scss';

const Navbar = (): React.ReactElement => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <nav className='navbar'>
            <div className='navbar__home-button'>
                <Button href='/companion'>
                    <span>Stonkofus</span>
                </Button>
            </div>
            <div className='navbar__navigation'>
                {isAuth === true ? (
                    <Fragment>
                        {/* <li>
                            <Button layout="link" tag='a' href='/companion'>Companion</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/holdings'>Report</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/dashboard'>Dashboard</Button>
                        </li> */}
                        <div className='navbar__navigation__button'>
                            <Button href='/admin'>
                                <span>Admin</span>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button href='/games'>
                                <span>Games</span>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button href='/wallets'>
                                <span>My Wallets</span>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button href='/logout'>
                                <span>Logout</span>
                            </Button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className='navbar__navigation__button'>
                            <Button href='/login'>
                                <span>Login</span>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button href='/signup'>
                                <span>Signup</span>
                            </Button>
                        </div>
                    </Fragment>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
