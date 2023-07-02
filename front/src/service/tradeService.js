import url from "../tools/apiCall";

const postTrade = (user, buyTransaction, sellTransaction) => {
    const body = {
        user, buyTransaction, sellTransaction
    }

    return fetch(url('trade/', 8000), {
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

    return fetch(url('trade/' + id + '/', 8000), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

const getRealizedTrades = () => {
    return fetch(url('trade/get_realized_trades/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

const getUnrealizedTrades = () => {
    return fetch(url('trade/get_unrealized_trades/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

const getHoldingAssets = () => {
    return fetch(url('trade/get_holding_assets/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

export {postTrade, updateTrade, getRealizedTrades, getUnrealizedTrades, getHoldingAssets}
