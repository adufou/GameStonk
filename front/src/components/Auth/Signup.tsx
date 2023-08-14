import React, {
    ChangeEvent,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import authApi from '@/http/api/auth/authApi';
import store from '@/stores/globalStore';
import { setToken } from '@/stores/user/userReducer';
import { fetchCurrentUser } from '@/stores/user/userStore.tools';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';
import { setLocalToken } from '@/tools/localToken';

const Signup = (): React.ReactElement => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setLastName(event.target.value);
    };

    const handleSignup = (): void => {
        if (password1 !== password2) {
            setErrors(true);
        }
        
        const user = {
            email,
            password: password1,
            firstName,
            lastName,
        };

        authApi.registerUser(user)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    if (response.body.access_token) {
                        store.dispatch(setToken(response.body.access_token));
                        setLocalToken(response.body.access_token);

                        fetchCurrentUser().catch((e) => {
                            console.warn(e);
                        });

                        navigate('dashboard');
                    }
                    
                    return;
                }

                setPassword1('');
                setPassword2('');
                setErrors(true);
            })
            .catch(
                e => console.error(e),
            );
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
                    onClick={handleSignup}
                >
                    <p>Sign Up</p>
                </Button>
            </div>
        </div>
    );
};

export default Signup;
