import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Debugger from './src/debugger';
import Counter from './src/components/Counter';

const App = () => {
  React.useEffect(() => {
    console.log('app did amount');
  }, []);

  return (
    <Debugger>
      <View style={styles.container}>
        <Text>Hello World</Text>
        <Counter />
      </View>
    </Debugger>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
