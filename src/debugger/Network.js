import React from 'react';

import {DebuggerContext} from './context';

export default () => {
  const {addNetwork} = React.useContext(DebuggerContext);

  React.useEffect(() => {
    (function (send) {
      XMLHttpRequest.prototype.send = function () {
        const callback = this.onreadystatechange;
        this.onreadystatechange = async function (data) {
          if (this.readyState === XMLHttpRequest.DONE) {
            const url = this.responseURL;

            if (url.includes('localhost:8081')) {
              return;
            }

            const response =
              typeof this.response === 'string'
                ? JSON.parse(this.response)
                : {};

            addNetwork(url, this.status, response);
          }

          if (callback) {
            callback.apply(this, arguments);
          }
        };
        if (this.responseType === 'blob') {
          this.responseType = '';
        }
        send.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype.send);
  }, [addNetwork]);

  return null;
};
