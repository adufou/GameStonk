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
                            <Button>
                                <Link to='admin'>
                                    Admin
                                </Link>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button>
                                <Link to='games'>
                                    Games
                                </Link>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button>
                                <Link to='wallets'>
                                    My Wallets
                                </Link>
                            </Button>
                        </div>
                        <div className='navbar__navigation__button'>
                            <Button>
                                <Link to='logout'>
                                    Logout
                                </Link>
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
