/**
 * @Author : SwatiGarg
 */

import React, { Component } from 'react';
import {
  Text,
  AppRegistry
} from 'react-native';

//Calculator component
class Calculator extends Component {

  render() {
    return (
        <Text> Hey There! </Text>
      )
  }
}

AppRegistry.registerComponent('Calculator', () => Calculator);