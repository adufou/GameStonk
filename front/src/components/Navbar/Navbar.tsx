import React, {
    Fragment,
    useState,
} from 'react';
import LogoutModal from '@/components/Auth/LogoutModal';
import ButtonLink from '@/components/DesignSystem/Button/ButtonLink';
import store from '@/stores/globalStore';
import mappedStateComponent from '@/tools/mappedStateComponent';

const Navbar = (): React.ReactElement => {
    const [isModalLogoutOpen, setIsLogoutModalOpen] = useState(false);
    
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
            
            <LogoutModal
                isOpen={isModalLogoutOpen}
                closeModal={closeLogoutModal}
            />
        </>
    );
};

export default mappedStateComponent(Navbar);
