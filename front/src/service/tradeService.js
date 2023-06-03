const postTrade = (user, buyTransaction, sellTransaction) => {
    const body = {
        user, buyTransaction, sellTransaction
    }

    return fetch('http://ns399800.ip-5-196-67.eu:8000/trade/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

const updateTrade = (user, buyTransaction, sellTransaction, sellOrderPrice, id) => {
    const body = {
        user, buyTransaction, sellTransaction, sellOrderPrice
    }

    return fetch('http://ns399800.ip-5-196-67.eu:8000/trade/' + id + '/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

const getRealizedTrades = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/trade/get_realized_trades/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

const getUnrealizedTrades = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/trade/get_unrealized_trades/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

const getHoldingAssets = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/trade/get_holding_assets/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

export {postTrade, updateTrade, getRealizedTrades, getUnrealizedTrades, getHoldingAssets}
