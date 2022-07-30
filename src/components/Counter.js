import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default () => {
  const [counter, setCounter] = React.useState(0);

  const decreaseCounter = () => {
    setCounter(oldCounter => {
      console.log('decrease counter to', oldCounter - 1);
      return oldCounter - 1;
    });
  };

  const increaseCounter = () => {
    setCounter(oldCounter => {
      console.log('decrease counter to', oldCounter + 1);
      return oldCounter + 1;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={decreaseCounter}
        style={styles.buttonContainer}>
        <Text>Decrease</Text>
      </TouchableOpacity>
      <Text>{counter}</Text>
      <TouchableOpacity
        onPress={increaseCounter}
        style={styles.buttonContainer}>
        <Text>Increase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 0, 0.4)',
    margin: 10,
  },
});
