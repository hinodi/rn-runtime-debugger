import React from 'react';

import {DebuggerContext} from './context';
import Logger from './Logger';
import Network from './Network';
import DebuggerContent from './DebuggerContent';

export default class Debugger extends React.Component {
  state = {logs: [], networks: []};

  addLog = (message, args) =>
    this.setState(({logs}) => ({logs: [...logs, {message, args}]}));

  addNetwork = (url, status, response) =>
    this.setState(({networks}) => ({
      networks: [...networks, {url, status, response}],
    }));

  clearLog = () => this.setState({logs: []});
  clearNetwork = () => this.setState({networks: []});

  render() {
    return (
      <DebuggerContext.Provider
        value={{
          logs: this.state.logs,
          networks: this.state.networks,
          addLog: this.addLog,
          addNetwork: this.addNetwork,
          clearLog: this.clearLog,
          clearNetwork: this.clearNetwork,
        }}>
        <Logger />
        <Network />
        {this.props.children}
        <DebuggerContent />
      </DebuggerContext.Provider>
    );
  }
}
