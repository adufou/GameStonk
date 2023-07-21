import React, { useState, useEffect, Fragment } from 'react';
import redirect from '../../tools/redirect';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Button from '../DesignSystem/Button/Button';
import './Logout.scss';

const Logout = (): React.ReactElement => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            redirect('login');
        } else {
            setLoading(false);
        }
    }, []);

    // TODO Fix it, I don't know the contract, do after refacto

    // const handleLogout = () => {
    //     console.log('logout');

    //     authApi.logoutUser(null, (response) => {
    //         if (response.status === 200) {
    //             redirect('login');
    //         }

    //         localStorage.clear();
    //     });
    // };

    return (
        <div className='logout'>
            <Card>
                <CardBody>
                    <Fragment>
                        {!loading &&
                            <div className='logout__button'>
                                <Button label="Are you sure you want to logout?">
                                    <p>Logout</p>
                                </Button>
                            </div>
                        }
                    </Fragment>
                </CardBody>
            </Card>
        </div>
    );
};

export default Logout;
