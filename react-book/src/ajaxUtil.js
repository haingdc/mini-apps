export default {
  post(url, data) {
    return fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(data)
    }).then(resp => resp.json());
  }
};
