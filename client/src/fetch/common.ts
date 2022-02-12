import {logger} from "../logger";
/**
 * Handles response by returning body of response if OK is returned in headers
 * otherwise extracts errormessage from the body and throws error with that message instead
 * @param response
 */
export const handleResponse = async (response: any): Promise<any> => {
    if (!response.ok) {
        logger.info(`Response status not OK`);
        const body = await response.json();
        throw Error(body.error);
    }
    logger.info(`Response status OK. Returning response.json()`);
    return await response.json();
};
