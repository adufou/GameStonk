const postItem = (itemBank) => {
    const body = {
        itemBank
    };

    return fetch('http://127.0.0.1:8000/item/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
};

export {postItem}
