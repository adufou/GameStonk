const getItemBank = () => {
    return fetch('http://127.0.0.1:8000/item_bank/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postItemBank = (body) => {
    return fetch('http://127.0.0.1:8000/item_bank/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

export {getItemBank, postItemBank}