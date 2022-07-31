import React from 'react';

import {consoleOverride} from './override/log';
import {fetchOverride, XMLHttpRequestOverride} from './override/network';

import DebuggerUI from './DebuggerUI';

export default class Debugger extends React.Component {
  state = {logs: [], networks: []};

  componentDidMount() {
    consoleOverride(this.addLog);
    XMLHttpRequestOverride(this.addNetwork);
    fetchOverride(this.addNetwork);
  }

  addLog = (message, args) =>
    this.setState(({logs}) => ({logs: [...logs, {message, args}]}));

  addNetwork = (url, status, response) =>
    this.setState(({networks}) => ({
      networks: [...networks, {url, status, response}],
    }));

  clearLog = () => this.setState({logs: []});
  clearNetwork = () => this.setState({networks: []});

  render() {
    const {logs, networks} = this.state;
    return (
      <>
        {this.props.children}
        <DebuggerUI
          logs={logs}
          networks={networks}
          clearLog={this.clearLog}
          clearNetwork={this.clearNetwork}
        />
      </>
    );
  }
}
