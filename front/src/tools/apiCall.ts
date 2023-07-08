import { URL_PREFIX } from './consts';

const constructUrl = (uri, port = 8000) => {
    return `http://${URL_PREFIX}:${port}/${uri}/`;
};

export const apiCall = (uri, method, callback, data = null, port = 8000) => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    const url = constructUrl(uri, port);
    let requestData = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    };
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data)
        };
    }

    fetch(url, requestData)
        .then(async res => {
            try {
                const resJson = await res.json();
    
                callback({
                    status: res.status,
                    body: resJson,
                });
            } catch (e) {
                callback({
                    status: res.status,
                    body: {},
                });
            }
        
        });

};

export const publicApiCall = (uri, method, callback, data = null, port = 8000) => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    const url = constructUrl(uri, port);
    let requestData = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data)
        };
    }

    fetch(url, requestData)
        .then(async res => {
            try {
                const resJson = await res.json();
    
                callback({
                    status: res.status,
                    body: resJson,
                });
            } catch (e) {
                callback({
                    status: res.status,
                    body: {},
                });
            }
        });

};
