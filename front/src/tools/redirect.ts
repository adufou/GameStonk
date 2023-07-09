import { URL_PREFIX } from './consts';

const redirect = (uri: string, port = 4000): void => {
    window.location.replace(`http://${URL_PREFIX}:${port}/${uri}`);
};

export default redirect;
