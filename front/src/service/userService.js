const getUser = () => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/users/auth/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postLoginUser = (user) => {
    return fetch('http://ns399800.ip-5-196-67.eu:8000/users/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export {getUser, postLoginUser}
