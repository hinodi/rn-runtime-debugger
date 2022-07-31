import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {DebuggerContext} from './context';

export default () => {
  const [isMinimized, setIsMinimized] = React.useState(true);
  const [tab, setTab] = React.useState(0);

  if (isMinimized) {
    return (
      <TouchableOpacity
        style={styles.minimizedView}
        onPress={() => setIsMinimized(false)}
      />
    );
  }

  const {logs, networks} = React.useContext(DebuggerContext);

  if (tab === 0) {
    return (
      <View style={styles.maximizedView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMinimized(true)}>
          <Text>Close</Text>
        </TouchableOpacity>
        <ScrollView>
          {logs?.map((log, logIndex) => (
            <View style={styles.logContainer} key={String(logIndex)}>
              <Text>{log?.message}</Text>
              {log?.args.map((arg, argIndex) => (
                <Text key={String(argIndex)} style={styles.logArgText}>
                  {JSON.stringify(arg)}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (tab === 1) {
    return (
      <View style={styles.maximizedView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMinimized(true)}>
          <Text>Close</Text>
        </TouchableOpacity>
        <ScrollView>
          {networks?.map((network, networkIndex) => (
            <View style={styles.logContainer} key={String(networkIndex)}>
              <Text>{network?.url}</Text>
              <Text style={styles.logArgText}>{network?.status}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return null;
};

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
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    alignSelf: 'flex-end',
    padding: 10,
  },
  logContainer: {
    // flexDirection: 'row',
  },
  logArgText: {
    marginLeft: 4,
    color: 'red',
  },
});
