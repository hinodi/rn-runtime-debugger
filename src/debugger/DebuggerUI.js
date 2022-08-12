import React, {Component} from 'react';
import {
  ScrollView,
  Share,
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

  copyAsCURL = network => () => {
    const {url, method, headers, body} = network;

    const curlRequest = method?.toUpperCase() || 'GET';
    const curlData = body ? ` --data '${body}'` : '';

    const curlHeaders = (() => {
      if (!headers || typeof headers !== 'object') {
        return null;
      }

      return Object.entries(headers);
    })();

    const curl = `curl --request ${curlRequest} \\
    --url ${url} ${curlHeaders ? '\\' : ''}
    ${curlHeaders?.map(
      ([key, value], index) =>
        `--header '${key}: ${value}' ${
          index < curlHeaders?.length - 1 ? '\\' : curlData ? '\\' : ''
        }`,
    )}
    ${curlData}`;

    Share.share({message: curl});
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
            <Text style={styles.whileText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onMinimizePress}>
            <Text style={styles.whileText}>Close</Text>
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
                <Text style={styles.logArgText}>{network?.method}</Text>
                <Text>{network?.url}</Text>
                <Text style={styles.logArgText}>{network?.status}</Text>
                <Text style={styles.logArgText}>
                  {JSON.stringify(network?.response)}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.copyAsCURL(network)}>
                  <Text style={styles.whileText}>Copy as cURL</Text>
                </TouchableOpacity>
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
  whileText: {
    color: 'white',
  },
});
