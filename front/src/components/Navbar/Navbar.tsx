import React, { Fragment } from 'react';
import ButtonLink from '@/components/DesignSystem/Button/ButtonLink';
import store from '@/stores/globalStore';
import mappedStateComponent from '@/tools/mappedStateComponent';

const Navbar = (): React.ReactElement => {
    const handleDebug = (): void => {
        console.log('DEBUG START');
        console.log(store.getState().gamesStore);
        console.log(store.getState().userStore);
        console.log(store.getState().userStore.token);
        console.log('DEBUG STOP');
    };

    return (
        <nav className='navbar'>
            <div className='navbar__home-button'>
                <ButtonLink href='/companion'>
                    <span>Stonkofus</span>
                </ButtonLink>
            </div>

            <div className='navbar__debug-button'>
                <ButtonLink onClick={handleDebug}>
                    <span>DEBUG</span>
                </ButtonLink>
            </div>

            <div className='navbar__navigation'>
                {store.getState().userStore.token ? (
                    <Fragment>
                        {/* <li>
                            <ButtonLink layout="link" tag='a' href='/companion'>Companion</ButtonLink>
                        </li>
                        <li>
                            <ButtonLink layout="link" tag='a' href='/holdings'>Report</ButtonLink>
                        </li>
                        <li>
                            <ButtonLink layout="link" tag='a' href='/dashboard'>Dashboard</ButtonLink>
                        </li> */}
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/admin'>
                                <span>Admin</span>
                            </ButtonLink>
                        </div>
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/games'>
                                <span>Games</span>
                            </ButtonLink>
                        </div>
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/wallets'>
                                <span>My Wallets</span>
                            </ButtonLink>
                        </div>
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/logout'>
                                <span>Logout</span>
                            </ButtonLink>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/login'>
                                <span>Login</span>
                            </ButtonLink>
                        </div>
                        <div className='navbar__navigation__button'>
                            <ButtonLink href='/signup'>
                                <span>Signup</span>
                            </ButtonLink>
                        </div>
                    </Fragment>
                )}
            </div>
        </nav>
    );
};

export default mappedStateComponent(Navbar);
