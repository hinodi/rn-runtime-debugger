import React from 'react';

import {DebuggerContext} from './context';

export default () => {
  const {addNetwork} = React.useContext(DebuggerContext);

  React.useEffect(() => {
    (function (send) {
      XMLHttpRequest.prototype.send = function () {
        const callback = this.onreadystatechange;
        this.onreadystatechange = async function (data) {
          if (this.readyState === this.DONE) {
            addNetwork(
              this.responseURL,
              this.status,
              JSON.parse(this.response),
            );
          }

          if (callback) {
            callback.apply(this, arguments);
          }
        };
        this.responseType = '';
        send.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype.send);
  }, [addNetwork]);

  return null;
};
