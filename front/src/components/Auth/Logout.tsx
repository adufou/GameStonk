import React from 'react';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Button from '../DesignSystem/Button/Button';
import './Logout.scss';
import authApi from '../../http/api/auth/authApi';
import store from '../../stores/globalStore';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../stores/user/userReducer';
import { clearLocalToken } from '../../tools/localToken';

const Logout = (): React.ReactElement => {
    const navigate = useNavigate();

    const clearTokenAndRedirectToLogin = () => {
        store.dispatch(setToken(null));
        clearLocalToken();

        navigate('/login');
    };
    
    const handleLogout = async () => {
        const user = store.getState().userStore.user;
        if (user === null) {
            console.warn('User was null, cleared token.');

            clearTokenAndRedirectToLogin();
            return;
        }

        const response = await authApi.logoutUser(user);

        if (response.status === 200) {
            clearTokenAndRedirectToLogin();
        }
    };

    return (
        <div className='logout'>
            <Card>
                <CardBody>
                    <div className='logout__button'>
                        <Button
                            label="Are you sure you want to logout?"
                            onClick={handleLogout}
                        >
                            <p>Logout</p>
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Logout;
