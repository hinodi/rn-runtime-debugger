import React from 'react';

import {DebuggerContext} from './context';

export default () => {
  const {addLog} = React.useContext(DebuggerContext);

  React.useEffect(() => {
    var _log = console.log;

    console.log = function (message, ...args) {
      addLog(message, args);
      _log.apply(console, arguments);
    };
  }, [addLog]);

  return null;
};
