export const XMLHttpRequestOverride = (customFunction = () => {}) => {
  const originXMLHttpRequestSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.send = function () {
    const originOnreadystatechange = this.onreadystatechange;
    this.onreadystatechange = async function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const {responseURL, response, _method, _headers, _body} = this;
        try {
          if (
            !responseURL.includes('localhost:8081') &&
            this.responseType !== 'blob' &&
            typeof response === 'string'
          ) {
            customFunction(
              responseURL,
              this.status,
              JSON.parse(response),
              _method,
              _headers,
              _body,
            );
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
    const {method = 'GET', headers, body} = arguments?.[1] || {};
    const response = await originFetch.apply(this, arguments);
    const {url, status} = response;

    const originResponseJson = response.json;
    response.json = async function () {
      const json = await originResponseJson.apply(this, arguments);

      if (!url.includes('localhost:8081')) {
        customFunction(url, status, json, method, headers, body);
      }

      return json;
    };

    return response;
  };
};
