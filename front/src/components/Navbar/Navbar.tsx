import React, {
    Fragment,
    useState,
} from 'react';
import LogoutModal from '@/components/Auth/LogoutModal';
import ButtonLink from '@/components/DesignSystem/Button/ButtonLink';

interface NavbarProps {
    isUserLogged: boolean
}

const Navbar = ({ isUserLogged }: NavbarProps): React.ReactElement => {
    const [isModalLogoutOpen, setIsLogoutModalOpen] = useState(false);
    
    const openLogoutModal = (): void => {
        setIsLogoutModalOpen(true);
    };
    
    const closeLogoutModal = (): void => {
        setIsLogoutModalOpen(false);
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
                    <ButtonLink onClick={undefined /* noop */}>
                        <span>DEBUG</span>
                    </ButtonLink>
                </div>

                <div className='navbar__navigation'>
                    {isUserLogged ? (
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

export default Navbar;
