import React from 'react';

export const DebuggerContext = React.createContext({
  logs: [],
  networks: [],
  addLog: () => {},
  addNetwork: () => {},
});
