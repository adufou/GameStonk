import { URL_PREFIX } from './consts';

interface RequestData {
    method: string,
    headers: {
        'Content-Type': string,
        Authorization?: string
    },
    body?: string,
}

const constructUrl = (uri: string, port = 8000): string => {
    return `http://${URL_PREFIX}:${port}/${uri}/`;
};

export const apiCall = async (uri: string, method: string, data: any = null, port = 8000): Promise<{
    status: number,
    body: any,
}> => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    
    const token = localStorage.getItem('token');
    if (token === null) {
        return({
            status: 418,
            body: 'No token in localStorage',
        });
    }
    
    const url = constructUrl(uri, port);
    let requestData: RequestData = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        },
        body: undefined,
    };
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data)
        };
    }

    const res = await fetch(url, requestData);

    try {
        const resJson = await res.json() as string;

        return({
            status: res.status,
            body: resJson,
        });
    } catch (e) {
        return({
            status: res.status,
            body: {},
        });
    }
};

export const publicApiCall = async (uri: string, method: string, data = null, port = 8000): Promise<{
    status: number,
    body: any,
}> => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    const url = constructUrl(uri, port);
    let requestData: RequestData = {
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

    const res = await fetch(url, requestData);

    try {
        const resJson = await res.json() as string;

        return({
            status: res.status,
            body: resJson,
        });
    } catch (e) {
        return({
            status: res.status,
            body: {},
        });
    }
};
