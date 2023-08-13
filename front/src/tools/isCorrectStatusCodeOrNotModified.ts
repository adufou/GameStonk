import { HttpStatusCode } from 'axios';

const isCorrectStatusCodeOrNotModified = (statusCode: number, expected = HttpStatusCode.Ok): boolean => {
    return statusCode === expected || statusCode === HttpStatusCode.NotModified;
};

export default isCorrectStatusCodeOrNotModified;
