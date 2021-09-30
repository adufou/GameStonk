const postTrade = (user, buyTransaction, sellTransaction) => {
    const body = {
        user, buyTransaction, sellTransaction
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

const getUnrealizedTrades = () => {
    return fetch('http://127.0.0.1:8000/trade/get_unrealized_trades/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

export {postTrade, getUnrealizedTrades}
