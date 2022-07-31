import React from 'react';

import {DebuggerContext} from './context';

export default () => {
  const {addLog} = React.useContext(DebuggerContext);

  React.useEffect(() => {
    const originLog = console.log;

    console.log = function (message, ...args) {
      addLog(message, args);
      originLog.apply(this, arguments);
    };
  }, [addLog]);

  return null;
};
