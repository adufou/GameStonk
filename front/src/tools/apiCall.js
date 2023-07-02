import { URL_PREFIX } from './consts'

const constructUrl = (uri, port = 8000) => {
    return `http://${URL_PREFIX}:${port}/${uri}`;
}

const apiCall = (uri, method, callback, data = null, port = 8000) => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    const url = constructUrl(uri, port);
    let requestData = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data)
        }
    }

    fetch(url, requestData)
    // TODO Chelou ça
    .then(res => res.json())
    .then(data => {
        callback(data);
    });

}

export default apiCall;
