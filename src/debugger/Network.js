import React from 'react';

import {DebuggerContext} from './context';

export default () => {
  const {addNetwork} = React.useContext(DebuggerContext);

  React.useEffect(() => {
    const originXMLHttpRequestSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
      const originOnreadystatechange = this.onreadystatechange;
      this.onreadystatechange = async function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          const {responseURL, response} = this;

          if (
            !responseURL.includes('localhost:8081') &&
            this.responseType !== 'blob' &&
            typeof response === 'string'
          ) {
            addNetwork(responseURL, this.status, JSON.parse(response));
          }
        }

        if (originOnreadystatechange) {
          originOnreadystatechange.apply(this, arguments);
        }
      };
      originXMLHttpRequestSend.apply(this, arguments);
    };

    const originFetch = fetch;
    fetch = async function () {
      const response = await originFetch.apply(this, arguments);
      const {url, status} = response;

      const originResponseJson = response.json;
      response.json = async function () {
        const json = await originResponseJson.apply(this, arguments);

        if (!url.includes('localhost:8081')) {
          addNetwork(url, status, json);
        }

        return json;
      };

      return response;
    };
  }, [addNetwork]);

  return null;
};
