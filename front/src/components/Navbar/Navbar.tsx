import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../DesignSystem/Button/Button';
import './Navbar.scss';
import store from '../../stores/globalStore';
import IGlobalState from '../../stores/IGlobalState';
import { connect } from 'react-redux';

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

/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = (state: IGlobalState) => ({
    state: state
});

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
// const mapDispatchToProps = (dispatch) => ({
// 	actions: bindActionCreators(Actions, dispatch)
// })


/**
 * Finally the Redux store is connected
 * to the component with the `connect()`
 * function.
 */
export default connect(
    mapStateToProps
)(Navbar);

// export default Navbar;
