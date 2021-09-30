const postTransaction = (userId, itemPriceId, volume) => {
    const body = {
        userId, itemPriceId, volume
    }

    return fetch('http://127.0.0.1:8000/transaction/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postTransaction}
