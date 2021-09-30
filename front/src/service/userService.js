const getUser = () => {
    return fetch('http://127.0.0.1:8000/users/auth/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postLoginUser = (user) => {
    return fetch('http://127.0.0.1:8000/users/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export {getUser, postLoginUser}
