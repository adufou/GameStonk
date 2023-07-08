import React, { useState, useEffect } from 'react';
import redirect from '../../tools/redirect';
import { useAuthApi } from '../../http/api/auth/useAuthApi';
import Button from '../DesignSystem/Button/Button';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    const authApi = useAuthApi();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            redirect('dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        };

        authApi.loginUser(user, (response) => {
            if (response.status === 200) {
                if (response.body?.key) {
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
        });
    };

    return (
        <div>
            <Card>
                <CardBody>
                    {loading === false && <Label>
                        <p>Login</p>
                    </Label>}
                    {errors === true && <h2>Cannot log in with provided credentials</h2>}
                    {loading === false && (
                        <form onSubmit={onSubmit}>
                            <Label>
                                <p>Adresse email</p>
                                <Input
                                    name='email'
                                    type='email'
                                    value={email}
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Label>

                            <Label>
                                <p>Mot de passe</p>
                                <Input
                                    name='password'
                                    type='password'
                                    value={password}
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Label>

                            <Button type='submit'>Login</Button>
                        </form>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
