import {HttpStatusCode} from "axios";

const isCorrectStatusCodeOrNotModified = (statusCode: number, expected = HttpStatusCode.Ok) => {
    return statusCode === expected || statusCode === HttpStatusCode.NotModified;
}

export default isCorrectStatusCodeOrNotModified;
