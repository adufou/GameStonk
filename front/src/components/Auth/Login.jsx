import React, { useState, useEffect } from 'react';
import {postLoginUser} from "../../service/userService";
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import redirect from '../../tools/redirect';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

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
            password: password
        };

        postLoginUser(user)
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    redirect('dashboard');
                } else {
                    setEmail('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <div className="container mx-auto w-96">
            <Card className="mt-32">
                <CardBody>
                    {loading === false && <Label>
                        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Login</p>
                    </Label>}
                    {errors === true && <h2>Cannot log in with provided credentials</h2>}
                    {loading === false && (
                        <form onSubmit={onSubmit}>
                            <Label className="mb-4">
                                <p className="mb-2">Adresse email</p>
                                <Input
                                    name='email'
                                    type='email'
                                    value={email}
                                    required
                                    onChange={e => setEmail(e.target.value)}/>
                            </Label>

                            <Label className="mb-4">
                                <p className="mb-2">Mot de passe</p>
                                <Input
                                    name='password'
                                    type='password'
                                    value={password}
                                    required
                                    onChange={e => setPassword(e.target.value)}/>
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
