import React, {
    Fragment,
    useState,
} from 'react';
import ButtonLink from '@/components/DesignSystem/Button/ButtonLink';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import store from '@/stores/globalStore';
import { clearLocalTokenAndRedirectToLogin } from '@/tools/authTools';
import mappedStateComponent from '@/tools/mappedStateComponent';

const Navbar = (): React.ReactElement => {
    const [isModalLogoutOpen, setIsLogoutModalOpen] = useState(false);
    
    const handleLougout = (): void => {
        clearLocalTokenAndRedirectToLogin();
    };
    
    const openLogoutModal = (): void => {
        setIsLogoutModalOpen(true);
    };
    
    const closeLogoutModal = (): void => {
        setIsLogoutModalOpen(false);
    };

    const handleDebug = (): void => {
        console.log('DEBUG START');
        console.log(store.getState().userStore);
        console.log(store.getState().userStore.token);
        console.log('DEBUG STOP');
    };

    return (
        <>
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
                                <ButtonLink onClick={openLogoutModal}>
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
            
            <TwoCTAsModal
                isOpen={isModalLogoutOpen}
                onAccept={handleLougout}
                onClose={closeLogoutModal}
            />
        </>
    );
};

export default mappedStateComponent(Navbar);
