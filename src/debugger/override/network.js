export const XMLHttpRequestOverride = (customFunction = () => {}) => {
  const originXMLHttpRequestSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.send = function () {
    const originOnreadystatechange = this.onreadystatechange;
    this.onreadystatechange = async function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const {responseURL, response} = this;
        try {
          if (
            !responseURL.includes('localhost:8081') &&
            this.responseType !== 'blob' &&
            typeof response === 'string'
          ) {
            customFunction(responseURL, this.status, JSON.parse(response));
          }
        } catch {}
      }

      if (originOnreadystatechange) {
        originOnreadystatechange.apply(this, arguments);
      }
    };
    originXMLHttpRequestSend.apply(this, arguments);
  };
};

export const fetchOverride = (customFunction = () => {}) => {
  const originFetch = fetch;
  fetch = async function () {
    const response = await originFetch.apply(this, arguments);
    const {url, status} = response;

    const originResponseJson = response.json;
    response.json = async function () {
      const json = await originResponseJson.apply(this, arguments);

      if (!url.includes('localhost:8081')) {
        customFunction(url, status, json);
      }

      return json;
    };

    return response;
  };
};
