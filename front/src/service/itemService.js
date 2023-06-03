const postItem = (itemBank) => {
    const body = {
        itemBank
    };

    return fetch('http://ns399800.ip-5-196-67.eu:8000/item/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postItem}
