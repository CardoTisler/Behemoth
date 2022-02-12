/**
 * Handles response by returning body of response if OK is returned in headers
 * otherwise extracts errormessage from the body and throws error with that message instead
 * @param response
 */
export const handleResponse = async (response: any): Promise<any> => {
    if (!response.ok) {
        const body = await response.json();
        throw Error(body.error);
    }
    return await response.json();
};
