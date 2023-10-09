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

const Signup = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState(false);
    
    const handleSignupQuerySuccess = (data: ApiResponseBody<{ access_token: string }>): void => {
        if (data.status !== HttpStatusCode.Ok || !data?.body?.access_token) {
            setErrors(true);
            return;
        }
        
        setLocalToken(data.body.access_token);
        redirect('games');
    };
    
    const signupQuery = useQuery('user', () => authApi.registerUser({
        email,
        password: password1,
        firstName,
        lastName,
    }),
    {
        enabled: false,
        onSuccess: handleSignupQuerySuccess,
    });
    
    const handleClickSignupButton = (): void => {
        if (password1 !== password2) {
            setErrors(true);
            return;
        }
        
        signupQuery.refetch()
            .catch(e => console.error(e));
    };
    
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

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setLastName(event.target.value);
    };

    return (
        <div className='signup'>
            <div className='signup__body'>
                {errors &&
                    <span className='signup__body__error'>Cannot signup with provided credentials</span>
                }
                
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

                <div className='signup__body__input'>
                    <Input
                        label='Prénom'
                        name='firstName'
                        value={firstName}
                        onChange={handleChangeFirstName}
                        isRequired
                    />
                </div>

                <div className='signup__body__input'>
                    <Input
                        label='Nom'
                        name='lastName'
                        value={lastName}
                        onChange={handleChangeLastName}
                        isRequired
                    />
                </div>
                
                <Button
                    className='signup__body__button'
                    onClick={handleClickSignupButton}
                >
                    <p>Sign Up</p>
                </Button>
            </div>
        </div>
    );
};

export default Signup;
