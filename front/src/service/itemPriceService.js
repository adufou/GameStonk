import url from '../tools/url';

const postItemPrice = (item, price, time) => {
    const body = {
        item, price, time
    };

    return fetch(url('item_price/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postItemPrice};
