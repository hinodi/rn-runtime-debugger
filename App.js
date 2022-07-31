import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Debugger from './src/debugger';
import Counter from './src/components/Counter';

const App = () => {
  React.useEffect(() => {
    console.log('app did amount');

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log('hinodi fetch OK 1', json);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('https://jsonplaceholder.typicode.com/xxx/1')
      .then(response => response.json())
      .then(json => {
        console.log('hinodi fetch OK 2', json);
      })
      .catch(error => {
        console.error(error);
      });

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log('hinodi XMLHttpRequest OK', xhr.response);
      }
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);
    xhr.send();
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
