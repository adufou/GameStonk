import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import redirect from '../../tools/redirect';
import url from '../../tools/apiCall';
import { useAuthApi } from '../../http/api/auth/useAuthApi';


const Logout = () => {
    const [loading, setLoading] = useState(true);

    const authApi = useAuthApi()

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
        })
    };

    return (
        <div className="container mx-auto w-96">
            <Card className="mt-32">
                <CardBody>
                    {loading === false && (
                        <Fragment>
                            <Label>
                                <p className="mb-2">Are you sure you want to logout?</p>
                                <Button value='Logout' onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Label>
                        </Fragment>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Logout;
