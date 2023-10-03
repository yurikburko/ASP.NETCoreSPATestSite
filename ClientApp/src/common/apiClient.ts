import authService from "../components/api-authorization/AuthorizeService";

export const get = <Resp>(url: string): Promise<Resp> => {
    return send(url, "GET");
}
export const deleteRequest = <Resp>(url: string): Promise<Resp> => {
    return send(url, "DELETE");
}
export const post = <Resp>(url: string): Promise<Resp> => {
    return send(url, "POST");
}

type SupportedMethods = "GET" | "DELETE" | "POST";
const send = async <Resp>(url: string, method: SupportedMethods): Promise<Resp> => {
    const token = await authService.getAccessToken();

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            if (response.status === 204) {
                return undefined as Resp;
            }

            const jsonData: Resp = await response.json();
            return jsonData;
        }
        else {
            if (response.status === 401) {
                // TODO. Handle access token expiration (by refreshing it)
                // here on response error and before request sending
            }

            throw new Error(`Call API error. Url: ${url}, Response status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const apiClient = {
    get,
    deleteRequest,
    post
};