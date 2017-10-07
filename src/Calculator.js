/**
 * @Author : SwatiGarg
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry
} from 'react-native';

import Style from './Style';
import InputButton from './InputButton';

// Input Buttons
const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

//Calculator component
class Calculator extends Component {

	constructor(props) {
        super(props);

        // states of calculator
        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        }

        this._onInputButtonPressed = this._onInputButtonPressed.bind(this);
    }


	render() {
        return (
        	// Display and input flex
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

   /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
        let views = [];

        return inputButtons.map((inputRow, r) => (
            <View style={Style.inputRow} key={"row-" + r}>
                {
                    inputRow.map((input, i) => (
                        <InputButton
		                        value={input}
		                        highlight={this.state.selectedSymbol === input}
		                        onPress={this._onInputButtonPressed(input)}
		                        key={r + "-" + i}
                        />
                    ))
                }
            </View>
        ))
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        })
    }

   _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
        }
    }

}

AppRegistry.registerComponent('Calculator', () => Calculator);
