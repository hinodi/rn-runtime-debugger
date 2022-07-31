import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import Frisbee from 'frisbee';
import superagent from 'superagent';

import Debugger from './src/debugger';
import Counter from './src/components/Counter';

const App = () => {
  React.useEffect(() => {
    console.log('app did amount');

    fetch('https://jsonplaceholder.typicode.com/todos/1?fetch1')
      .then(response => response.json())
      .then(json => {
        console.log('hinodi fetch OK 1', json);
      })
      .catch(console.error);

    fetch('https://jsonplaceholder.typicode.com/todos/1?fetch2')
      .then(response => response.json())
      .then(json => {
        console.log('hinodi fetch OK 2', json);
      })
      .catch(console.error);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log('hinodi XMLHttpRequest OK', JSON.parse(xhr.response));
      }
    };
    xhr.open(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1?XMLHttpRequest',
      true,
    );
    xhr.send();

    axios
      .get('https://jsonplaceholder.typicode.com/todos/1?axios')
      .then(function (response) {
        console.log('hinodi axios OK', response.data);
      })
      .catch(console.error);

    const frisbee = new Frisbee({});

    frisbee
      .get('https://jsonplaceholder.typicode.com/todos/1?frisbee')
      .then(function (response) {
        console.log('hinodi frisbee OK', response.body);
      })
      .catch(console.error);

    superagent
      .get('https://jsonplaceholder.typicode.com/todos/1?superagent')
      .then(function (response) {
        console.log('hinodi superagent OK', response.body);
      })
      .catch(console.error);
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
