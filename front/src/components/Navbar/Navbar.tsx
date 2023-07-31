import React, { Fragment } from 'react';
import Button from '../DesignSystem/Button/Button';
import './Navbar.scss';
import store from '../../stores/globalStore';
import mappedStateComponent from '../../tools/mappedStateComponent';

const Navbar = (): React.ReactElement => {
    const handleDebug = () => {
        console.log('DEBUG START');
        console.log(store.getState().gamesStore);
        console.log(store.getState().userStore);
        console.log(store.getState().userStore.token);
        console.log('DEBUG STOP');
    };

    return (
        <nav className='navbar'>
            <div className='navbar__home-button'>
                <Button href='/companion'>
                    <span>Stonkofus</span>
                </Button>
            </div>

            <div className='navbar__debug-button'>
                <Button onClick={handleDebug}>
                    <span>DEBUG</span>
                </Button>
            </div>

            <div className='navbar__navigation'>
                {store.getState().userStore.token ? (
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

export default mappedStateComponent(Navbar);
