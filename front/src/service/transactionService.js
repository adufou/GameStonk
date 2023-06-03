const postTransaction = (user, itemPrice, volume) => {
    const body = {
        user, itemPrice, volume
    }

    return fetch('http://ns399800.ip-5-196-67.eu:8000/transaction/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postTransaction}
