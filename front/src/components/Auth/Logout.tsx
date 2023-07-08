import React, { useState, useEffect, Fragment } from 'react';
import redirect from '../../tools/redirect';
import { useAuthApi } from '../../http/api/auth/useAuthApi';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Button from '../DesignSystem/Button/Button';


const Logout = () => {
    const [loading, setLoading] = useState(true);

    const authApi = useAuthApi();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            redirect('login');
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = e => {
        e.preventDefault();

        authApi.logoutUser(null, (response) => {
            if (response.status === 200) {
                redirect('login');
            }

            localStorage.clear();
        });
    };

    return (
        <div>
            <Card>
                <CardBody>
                    {loading === false && (
                        <Fragment>
                            <Button callback={handleLogout} label="Are you sure you want to logout?">
                                Logout
                            </Button>
                        </Fragment>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Logout;
