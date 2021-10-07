import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'


const Logout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            window.location.replace('http://localhost:4000/login');
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/users/auth/logout/', {
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
                window.location.replace('http://localhost:4000/login');
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
