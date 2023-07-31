import React, { useState, ChangeEvent, Fragment } from 'react';
import Button from '../DesignSystem/Button/Button';
import authApi from '../../http/api/auth/authApi';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Input from '../DesignSystem/Input/Input';
import './Login.scss';
import { setToken } from '../../stores/user/userReducer';
import { useNavigate } from 'react-router-dom';
import { setLocalToken } from '../../tools/localToken';
import store from '../../stores/globalStore';
import { fetchUser } from '../../stores/user/userStore.tools';

const Login = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    const navigate = useNavigate();

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
                store.dispatch(setToken(response.body.key));
                setLocalToken(response.body.key);

                fetchUser();

                navigate('dashboard');
            } else {
                setEmail('');
                setPassword('');
                setErrors(true);
            }
        }
    };

    return (
        <div className='login'>
            <Card>
                <CardBody>
                    <Fragment>
                        {errors &&
                            <h2>Cannot log in with provided credentials</h2>
                        }

                        <div className='login__body'>
                            <div className='login__body__input'>
                                <Input
                                    label='Adresse email'
                                    name='email'
                                    type='email'
                                    value={email}
                                    isRequired
                                    onChange={handleChangeEmail}
                                />
                            </div>

                            <div className='login__body__input'>
                                <Input
                                    label='Mot de passe'
                                    name='password'
                                    type='password'
                                    value={password}
                                    isRequired
                                    onChange={handleChangePassword}
                                />
                            </div>

                            <div className='login__body__button'>
                                <Button
                                    onClick={(): void => {
                                        onSubmit()
                                            .catch(
                                                e => console.error(e)
                                            );
                                    }}
                                >
                                    <p>Login</p>
                                </Button>
                            </div>

                        </div>
                    </Fragment>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
