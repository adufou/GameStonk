const postItemPrice = (item, price, time) => {
    const body = {
        item, price, time
    };

    return fetch('http://127.0.0.1:8000/item_price/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postItemPrice}
