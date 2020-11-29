const APIgateway = "https://gateway-service-fvwxmbq4sq-ue.a.run.app";

export async function getResults(url, num_words) {
  var encoded_url = encodeURIComponent(url);
  const request = `/keywords/${encoded_url}/${num_words}`;
  try {
    const response = await fetch(APIgateway + request);
    return response.data;
  } catch (e) {
    return {
      error: true,
      status: e.response && e.response.status,
      message: e.response && e.response.data,
    };
  }
}
