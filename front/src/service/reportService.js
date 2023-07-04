import url from '../tools/url';

const postReport = (user, itemPrice, volume) => {
    const body = {
        user, itemPrice, volume
    };

    return fetch(url('report/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export default postReport;
