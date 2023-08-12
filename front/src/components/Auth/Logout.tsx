import Button from '@/components/DesignSystem/Button/Button';
import Card from '@/components/DesignSystem/Card/Card';
import CardBody from '@/components/DesignSystem/Card/CardBody';
import { clearLocalTokenAndRedirectToLogin } from '@/tools/authTools';
import React from 'react';

const Logout = (): React.ReactElement => {
    const handleLogout = (): void => {
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
