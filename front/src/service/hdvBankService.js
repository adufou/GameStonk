import url from '../tools/url';

const getHdvBank = () => {
    return fetch(url('hdv_bank/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
};

const postHdvBank = (body) => {
    return fetch(url('hdv_bank/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: body
    });
};

export {getHdvBank, postHdvBank};
