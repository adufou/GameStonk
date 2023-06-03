const getHdvBank = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/hdv_bank/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postHdvBank = (body) => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/hdv_bank/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

export {getHdvBank, postHdvBank}
