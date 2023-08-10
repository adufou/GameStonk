import React, { useState, ChangeEvent, Fragment } from 'react';
import Button from '../DesignSystem/Button/Button';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import authApi from '../../http/api/auth/authApi';
import Input from '../DesignSystem/Input/Input';
import './Signup.scss';
import { setToken } from '../../stores/user/userReducer';
import { setLocalToken } from '../../tools/localToken';
import store from '../../stores/globalStore';
import { fetchUser } from '../../stores/user/userStore.tools';
import { useNavigate } from 'react-router-dom';

const Signup = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);

    const navigate = useNavigate();

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleChangePassword1 = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setPassword1(event.target.value);
    };

    const handleChangePassword2 = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setPassword2(event.target.value);
    };

    const onSubmit = async (): Promise<void> => {
        const user = {
            email: email,
            password1: password1,
            password2: password2
        };

        const response = await authApi.registerUser(user);

        if (response.status === 201) {
            if (response.body.access_token) {
                store.dispatch(setToken(response.body.access_token));
                setLocalToken(response.body.access_token);

                fetchUser();

                navigate('dashboard');
            } else {
                setEmail('');
                setPassword1('');
                setPassword2('');
                setErrors(true);
            }
        }
    };

    return (
        <div className='signup'>
            <Card>
                <CardBody>
                    <Fragment>
                        {errors &&
                            <h2>Cannot signup with provided credentials</h2>
                        }

                        <div className='signup__body'>
                            <div className='signup__body__input'>
                                <Input
                                    label='Adresse email'
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={handleChangeEmail}
                                    isRequired
                                />
                            </div>

                            <div className='signup__body__input'>
                                <Input
                                    label='Mot de passe'
                                    name='password1'
                                    type='password'
                                    value={password1}
                                    onChange={handleChangePassword1}
                                    isRequired
                                />
                            </div>

                            <div className='signup__body__input'>
                                <Input
                                    label='Confirmer le mot de passe'
                                    name='password2'
                                    type='password'
                                    value={password2}
                                    onChange={handleChangePassword2}
                                    isRequired
                                />
                            </div>

                            <div className='signup__body__button'>
                                <Button
                                    onClick={(): void => {
                                        onSubmit()
                                            .catch(
                                                e => console.error(e)
                                            );
                                    }}
                                >
                                    <p>Sign Up</p>
                                </Button>
                            </div>
                        </div>
                    </Fragment>
                </CardBody>
            </Card>
        </div>
    );
};

export default Signup;
