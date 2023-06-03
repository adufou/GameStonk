import { URL_PREFIX } from './consts'

const redirect = (uri, port = 4000) => {
    window.location.replace(`http://${URL_PREFIX}:${port}/${uri}`);
}

export default redirect;