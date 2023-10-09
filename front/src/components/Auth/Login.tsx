
import { HttpStatusCode } from 'axios';
import React, {
    ChangeEvent,
    useState,
} from 'react';
import { useQuery } from 'react-query';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import authApi from '@/http/api/auth/auth.api';
import { setLocalToken } from '@/tools/localToken';
import redirect from '@/tools/redirect';
import ApiResponseBody from '@/types/ApiResponseBody';

const Login = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    
    const handleLoginQuerySuccess = (data: ApiResponseBody<{ access_token: string }>): void => {
        if (data.status !== HttpStatusCode.Ok || !data?.body?.access_token) {
            setErrors(true);
            return;
        }
        
        setLocalToken(data.body.access_token);
        // fetchCurrentUser(queryClient, () => { setErrors(true); });
        redirect('games');
    };
    
    const loginQuery = useQuery(['user', 'accessToken'], () => authApi.loginUser({
        email,
        password,
    }),
    { 
        enabled: false,
        onSuccess: handleLoginQuerySuccess, 
    });
    
    const handleClickLoginButton = (): void => {
        loginQuery.refetch()
            .catch(e => console.error(e));
    };
    
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setPassword(event.target.value);
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
                    onClick={handleClickLoginButton}
                >
                    <p>Login</p>
                </Button>

            </div>
        </div>
    );
};

export default Login;
