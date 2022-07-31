import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const tabs = ['Log', 'Network'];

export default class DebuggerUI extends Component {
  state = {
    isMinimized: true,
    tab: tabs[0],
  };

  onMinimizePress = () => this.setState({isMinimized: true});
  onMaximizePress = () => this.setState({isMinimized: false});

  onChangeTab = tab => () => this.setState({tab});

  onClearPress = () => {
    const {clearLog, clearNetwork} = this.props;
    const {tab} = this.state;

    if (tab === tabs[0]) {
      clearLog();
    }
    if (tab === tabs[1]) {
      clearNetwork();
    }
  };

  render() {
    const {logs, networks} = this.props;
    const {isMinimized, tab} = this.state;

    if (isMinimized) {
      return (
        <TouchableOpacity
          style={styles.minimizedView}
          onPress={this.onMaximizePress}
        />
      );
    }

    return (
      <View style={styles.maximizedView}>
        <View style={styles.tabContainer}>
          {tabs.map(e => (
            <TouchableOpacity
              key={e}
              onPress={this.onChangeTab(e)}
              style={styles.tabButton}>
              <Text>{e}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onClearPress}>
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onMinimizePress}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        {tab === tabs[0] && (
          <ScrollView>
            {logs?.map((log, logIndex) => (
              <View style={styles.logContainer} key={String(logIndex)}>
                <Text>{log?.message}</Text>
                {log?.args?.map((arg, argIndex) => (
                  <Text key={String(argIndex)} style={styles.logArgText}>
                    {JSON.stringify(arg)}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
        {tab === tabs[1] && (
          <ScrollView>
            {networks?.map((network, networkIndex) => (
              <View style={styles.logContainer} key={String(networkIndex)}>
                <Text>{network?.url}</Text>
                <Text style={styles.logArgText}>{network?.status}</Text>
                <Text style={styles.logArgText}>
                  {JSON.stringify(network?.response)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  minimizedView: {
    position: 'absolute',
    zIndex: 9999,
    width: 20,
    height: 20,
    right: 0,
    bottom: 80,
    backgroundColor: 'red',
  },
  maximizedView: {
    position: 'absolute',
    zIndex: 9999,
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 255, 0.8)',
    alignSelf: 'flex-end',
    padding: 10,
    borderWidth: 0.5,
  },
  logContainer: {
    // flexDirection: 'row',
  },
  logArgText: {
    marginLeft: 4,
    color: 'red',
  },
  //
  tabContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
});
