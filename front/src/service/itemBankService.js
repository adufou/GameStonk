import url from '../tools/apiCall';

const getItemBank = () => {
    return fetch(url('item_bank/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
};

const postItemBank = (body) => {
    return fetch(url('item_bank/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

const getItemBankReports = (id) => {
    return fetch(url('item_bank/'+ id + '/get_reports/', 8000) , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    });
};

export {getItemBank, postItemBank, getItemBankReports};
