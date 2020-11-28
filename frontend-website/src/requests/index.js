const APIgateway = "https://gateway-service-fvwxmbq4sq-ue.a.run.app";

export function getResults(url) {
    var encoded_url = encodeURIComponent(url);
    const request = "/keywords/" + encoded_url + "/50";
    try {
        const response = fetch(APIgateway + request);
        return response.data;
    } catch (e) {
        return {
            error: true,
            status: e.response && e.response.status,
            message: e.response && e.response.data,
        };
    }
}