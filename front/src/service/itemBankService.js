const getItemBank = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/item_bank/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postItemBank = (body) => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/item_bank/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

const getItemBankReports = (id) => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/item_bank/' + id + '/get_reports/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    });
};

export {getItemBank, postItemBank, getItemBankReports}
