import React, { useState, useEffect } from 'react';
import { Card, CardBody, Input, Label, Button } from '@windmill/react-ui'
import redirect from '../../tools/redirect';
import url from '../../tools/url';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
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
            password1: password1,
            password2: password2
        };

        fetch(url('users/auth/register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    redirect('dashboard');
                } else {
                    setEmail('');
                    setPassword1('');
                    setPassword2('');
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
                        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Sign Up</p>
                    </Label>}
                    {errors === true && <h2>Cannot signup with provided credentials</h2>}
                    <form onSubmit={onSubmit}>
                        <Label className="mb-4">
                            <p className="mb-2">Adresse email</p>
                            <Input
                                name='email'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required/>
                        </Label>

                        {/*<label htmlFor='email'>Email address:</label> <br />*/}
                        {/*<input*/}
                        {/*    name='email'*/}
                        {/*    type='email'*/}
                        {/*    value={email}*/}
                        {/*    onChange={e => setEmail(e.target.value)}*/}
                        {/*    required*/}
                        {/*/>{' '}*/}
                        {/*<br />*/}

                        <Label className="mb-4">
                            <p className="mb-2">Mot de passe</p>
                            <Input
                                name='password1'
                                type='password'
                                value={password1}
                                onChange={e => setPassword1(e.target.value)}
                                required/>
                        </Label>
                        {/*<label htmlFor='password1'>Password:</label> <br />*/}
                        {/*<input*/}
                        {/*    name='password1'*/}
                        {/*    type='password'*/}
                        {/*    value={password1}*/}
                        {/*    onChange={e => setPassword1(e.target.value)}*/}
                        {/*    required*/}
                        {/*/>{' '}*/}
                        {/*<br />*/}

                        <Label className="mb-4">
                            <p className="mb-2">Confirmer le mot de passe</p>
                            <Input
                                name='password2'
                                type='password'
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                                required/>
                        </Label>

                        {/*<label htmlFor='password2'>Confirm password:</label> <br />*/}
                        {/*<input*/}
                        {/*    name='password2'*/}
                        {/*    type='password'*/}
                        {/*    value={password2}*/}
                        {/*    onChange={e => setPassword2(e.target.value)}*/}
                        {/*    required*/}
                        {/*/>{' '}*/}
                        {/*<br />*/}

                        <Button type='submit'>Sign Up</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Signup;
