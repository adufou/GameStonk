import React, { useState, useEffect, ChangeEvent, Fragment } from 'react';
import redirect from '../../tools/redirect';
import Button from '../DesignSystem/Button/Button';
import authApi from '../../http/api/auth/authApi';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Input from '../DesignSystem/Input/Input';


const Login = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const onSubmit = async (): Promise<void> => {
        const user = {
            email: email,
            password: password,
        };

        const response = await authApi.loginUser(user);
        if (response.status === 200) {
            if (response.body.key) {
                localStorage.clear();
                localStorage.setItem('token', response.body.key);
                redirect('dashboard');
            } else {
                setEmail('');
                setPassword('');
                localStorage.clear();
                setErrors(true);
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            redirect('dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div>
            <Card>
                <CardBody>
                    <Fragment>
                        if ({!loading}) {
                            <p>Login</p>
                        }
                        if ({errors}) {
                            <h2>Cannot log in with provided credentials</h2>
                        }
                        if ({!loading}) {
                            <div >
                                <Input
                                    label='Adresse email'
                                    name='email'
                                    type='email'
                                    value={email}
                                    isRequired
                                    onChange={handleChangeEmail}
                                />

                                <Input
                                    label='Mot de passe'
                                    name='password'
                                    type='password'
                                    value={password}
                                    isRequired
                                    onChange={handleChangePassword}
                                />

                                <Button type='submit' onClick={(): void => {
                                    onSubmit()
                                        .catch(
                                            e => console.error(e)
                                        );
                                }}>
                                    <p>Login</p>
                                </Button>
                            </div>
                        }
                    </Fragment>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
