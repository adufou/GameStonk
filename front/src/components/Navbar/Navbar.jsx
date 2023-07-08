import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../DesignSystem/Button/Button';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <nav>
            <Button href='/companion'>Stonkofus</Button>
            <ul>
                {isAuth === true ? (
                    <Fragment>
                        {' '}
                        {/* <li>
                            <Button layout="link" tag='a' href='/companion'>Companion</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/holdings'>Report</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/dashboard'>Dashboard</Button>
                        </li> */}
                        <li>
                            <Button>
                                <Link to='admin'>
                                    Admin
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button>
                                <Link to='games'>
                                    Games
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button>
                                <Link to='wallets'>
                                    My Wallets
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button>
                                <Link to='logout'>
                                    Logout
                                </Link>
                            </Button>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        {' '}
                        <li>
                            <Button href='/login'>Login</Button>
                        </li>
                        <li>
                            <Button href='/signup'>Signup</Button>
                        </li>
                    </Fragment>
                )}
                <li>
                    {/* <Button onClick={toggleMode}>
                        {mode === 'dark' ? (
                            // <p>Dark</p>
                            <ConfigIcon>
                                <BsMoonFill />
                            </ConfigIcon>
                        ) : (
                            // <p>Light</p>
                            <ConfigIcon>
                                <BsSunFill />
                            </ConfigIcon>
                        )}
                    </Button> */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
