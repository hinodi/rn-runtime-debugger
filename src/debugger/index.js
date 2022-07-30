import React from 'react';

import {DebuggerContext} from './context';
import Logger from './Logger';
import DebuggerContent from './DebuggerContent';

export default class Debugger extends React.Component {
  state = {logs: []};

  addLog = (message, args) =>
    this.setState(({logs}) => ({logs: [...logs, {message, args}]}));

  render() {
    return (
      <DebuggerContext.Provider
        value={{
          logs: this.state.logs,
          addLog: this.addLog,
        }}>
        <Logger />
        {this.props.children}
        <DebuggerContent />
      </DebuggerContext.Provider>
    );
  }
}
