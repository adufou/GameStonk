import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, WindmillContext } from '@windmill/react-ui'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import ConfigIcon from "../Icon/ConfigIcon";

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    const { mode, toggleMode } = useContext(WindmillContext)

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <nav className="flex items-center justify-between px-6 py-2 bg-gray-50 dark:bg-gray-800 shadow-lg">
            <a className="text-gray-700 dark:text-gray-400" href="/dashboard">Stonkofus</a>
            <ul className="flex space-x-4">
                {isAuth === true ? (
                    <Fragment>
                        {' '}
                        <li>
                            <Button layout="link" tag='a' href='/companion'>Companion</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/dashboard'>Dashboard</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/logout'>Logout</Button>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        {' '}
                        <li>
                            <Button layout="link" tag='a' href='/login'>Login</Button>
                        </li>
                        <li>
                            <Button layout="link" tag='a' href='/signup'>Signup</Button>
                        </li>
                    </Fragment>
                )}
                <li>
                    <Button onClick={toggleMode}>
                        {mode === 'dark' ? (
                            // <p>Dark</p>
                            <ConfigIcon>
                                <BsMoonFill/>
                            </ConfigIcon>
                        ) : (
                            // <p>Light</p>
                            <ConfigIcon>
                                <BsSunFill/>
                            </ConfigIcon>
                        )}
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
