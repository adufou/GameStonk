import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import redirect from '../../tools/redirect';
import url from '../../tools/apiCall';


const Logout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            redirect('login');
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = e => {
        e.preventDefault();

        fetch(url('users/auth/logout/', 8000), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                redirect('login');
            });
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
