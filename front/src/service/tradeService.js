const postTrade = (userId, buyTransactionId, sellTransactionId) => {
    const body = {
        userId, buyTransactionId, sellTransactionId
    }

    return fetch('http://127.0.0.1:8000/trade/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postTrade}
