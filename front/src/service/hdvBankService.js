const getHdvBank = () => {
    return fetch('http://127.0.0.1:8000/hdv_bank/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postHdvBank = (body) => {
    return fetch('http://127.0.0.1:8000/hdv_bank/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

export {getHdvBank, postHdvBank}
