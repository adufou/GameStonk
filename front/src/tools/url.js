import { URL_PREFIX } from './consts'

const url = (uri, port = 4000) => {
    return `http://${URL_PREFIX}:${port}/${uri}`;
}

export default url;