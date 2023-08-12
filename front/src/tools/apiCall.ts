import {
    API_PORT, URL_PREFIX,
} from '@/tools/consts';

interface RequestData extends RequestInit {
    method: string,
    headers: {
        'Content-Type': string,
        Authorization?: string
    },
    body?: string,
}

const constructUrl = (uri: string, port = 8000): string => `http://${ URL_PREFIX }:${ port }/${ uri }/`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiCall = async (uri: string, method: string, data: any = null, port = API_PORT): Promise<{
    status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            Authorization: `Bearer ${ token }`,
        },
        body: undefined,
    };
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicApiCall = async (uri: string, method: string, data: any = null, port = API_PORT): Promise<{
    status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
}> => {
    // TODO pourquoi le port sur fetch et dans l'url ??
    const url = constructUrl(uri, port);
    let requestData: RequestData = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    
    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data),
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
