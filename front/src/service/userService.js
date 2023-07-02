import url from "../tools/apiCall"

const getUser = () => {
    return fetch(url('users/auth/user/', 8000), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

const postLoginUser = (user) => {
    return fetch(url('users/auth/login/', 8000), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export {getUser, postLoginUser}
