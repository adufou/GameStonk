import url from '../tools/url';

const postItem = (itemBank) => {
    const body = {
        itemBank
    };

    return fetch(url('item/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postItem};
