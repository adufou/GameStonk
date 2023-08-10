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
import {clearLocalTokenAndRedirectToLogin} from "../../tools/authTools";

const Logout = (): React.ReactElement => {
    const handleLogout = async () => {
        clearLocalTokenAndRedirectToLogin();
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
