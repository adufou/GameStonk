import React, { useState, useEffect, Fragment } from 'react';
import Dashboard from "../Dashboard/Dashboard";

const Companion = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    const [newItemBankName, setNewItemBankName] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:4000/login');
        } else {
            fetch('http://127.0.0.1:8000/users/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUserEmail(data.email);
                    setLoading(false);
                });
        }
    }, []);

    function addItem() {
        console.log(newItemBankName);

        const body = JSON.stringify({
            "name": newItemBankName
        });

        fetch('http://127.0.0.1:8000/item_bank/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: body
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <h1>Companion</h1>

                    <p>Ajouter un item à la banque des items</p>
                    <input onChange={e => setNewItemBankName(e.target.value)}/>
                    <button onClick={addItem}>Ajouter</button>
                </Fragment>
            )}
        </div>
    );
};

export default Companion;
