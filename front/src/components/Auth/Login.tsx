import React, {
    ChangeEvent,
    useState,
} from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import authApi from '@/http/api/auth/authApi';
import store from '@/stores/globalStore';
import { setToken } from '@/stores/user/userReducer';
import { fetchCurrentUser } from '@/stores/user/userStore.tools';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';
import { setLocalToken } from '@/tools/localToken';
import redirect from '@/tools/redirect';

const Login = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const handleLogin = (): void => {
        const user = {
            email: email,
            password: password,
        };

        authApi.loginUser(user)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    if (response.body.access_token) {
                        store.dispatch(setToken(response.body.access_token));
                        setLocalToken(response.body.access_token);

                        fetchCurrentUser().catch((e) => {
                            console.warn(e);
                        });

                        redirect('games');
                    }

                    return;
                }

                setPassword('');
                setErrors(true);
            }).catch(
                e => console.error(e),
            );
    };

    return (
        <div className='login'>
            <div className='login__body'>
                {errors &&
                    <span className='login__body__error'>Cannot log in with provided credentials</span>
                }
                
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
                
                <Button
                    className='login__body__button'
                    onClick={handleLogin}
                >
                    <p>Login</p>
                </Button>

            </div>
        </div>
    );
};

export default Login;
