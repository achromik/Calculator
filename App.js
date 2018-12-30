import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {
    ADDITION_OPERATOR,
    SUBTRACTION_OPERATOR,
    MULTIPLICATION_OPERATOR,
    DIVISION_OPERATOR,
    CALCULATE_OPERATOR,
    DELETE_OPERATOR,
    DOT,
    ZERO,
} from './src/operators';

export default class App extends Component {
    state = {
        calculationText: '',
        displayText: '',
        resultText: '',
    };

    numbersPads = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

    numbersBottomOperatorsPads = [DOT, ZERO, CALCULATE_OPERATOR];

    operatorsPads = [
        DELETE_OPERATOR,
        DIVISION_OPERATOR,
        MULTIPLICATION_OPERATOR,
        SUBTRACTION_OPERATOR,
        ADDITION_OPERATOR,
    ];

    isLastCharOperator = () => {
        return this.operatorsPads.find(
            pad => pad.operand === this.state.calculationText.substr(-1),
        );
    };

    isLastCharDot = () => {
        return this.state.calculationText.substr(-1) === DOT;
    };

    calculate = () => {
        return eval(this.state.calculationText);
    };

    handleDotPad = () => {
        const { calculationText, displayText } = this.state;
        const leadingZero = ZERO;

        if (this.isLastCharOperator() || this.isLastCharDot()) {
            return;
        }

        if (calculationText.length === 0) {
            this.setState({
                calculationText: leadingZero + DOT,
                displayText: leadingZero + DOT,
            });
            return;
        }
        this.setState({
            calculationText: calculationText + DOT,
            displayText: displayText + DOT,
        });
    };

    handleMathPads = text => {
        const { calculationText, displayText } = this.state;

        if (this.isLastCharOperator()) {
            this.setState({
                calculationText: calculationText.slice(0, -1) + text.operand,
                displayText: displayText.slice(0, -1) + text.char,
            });
        } else {
            this.setState({
                calculationText: calculationText + text.operand,
                displayText: displayText + text.char,
            });
        }
    };

    handleCalculate = () => {
        this.setState({
            resultText: this.calculate(),
        });
    };

    handleDeleteOperator = () => {
        const { calculationText, displayText } = this.state;

        this.setState({
            calculationText: calculationText.slice(0, -1),
            displayText: displayText.slice(0, -1),
        });
    };

    handleZeroPad = text => {
        const { calculationText, displayText } = this.state;
        if (calculationText.length === 1 && calculationText === ZERO) return;
        this.setState({
            calculationText: calculationText + text,
            displayText: displayText + text,
        });
    };

    handlePadPressed = text => {
        const { calculationText, displayText } = this.state;

        switch (text) {
            case CALCULATE_OPERATOR:
                this.handleCalculate();
                break;

            case DELETE_OPERATOR:
                this.handleDeleteOperator();
                break;

            case ADDITION_OPERATOR:
            case SUBTRACTION_OPERATOR:
            case MULTIPLICATION_OPERATOR:
            case DIVISION_OPERATOR:
                this.handleMathPads(text);
                break;

            case DOT:
                this.handleDotPad();
                break;

            case ZERO:
                this.handleZeroPad(text);
                break;

            default:
                this.setState({
                    calculationText: calculationText + text,
                    displayText: displayText + text,
                });
        }
        return;
    };

    renderNumbersPad = () => {
        const numbersPads = this.numbersPads;
        return [
            numbersPads.map((row, index) => (
                <View key={index} style={styles.row}>
                    {row.map(pad => (
                        <TouchableOpacity
                            style={styles.pad}
                            key={pad}
                            onPress={() => this.handlePadPressed(pad)}
                        >
                            <Text style={styles.padText}>{pad}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )),
            <View key={'bottom-pads'} style={styles.row}>
                {this.numbersBottomOperatorsPads.map((pad, index) => (
                    <TouchableOpacity
                        style={styles.pad}
                        key={index}
                        onPress={() => this.handlePadPressed(pad)}
                    >
                        <Text style={styles.padText}>{pad}</Text>
                    </TouchableOpacity>
                ))}
            </View>,
        ];
    };

    renderOperatorsPad = () => {
        const operatorsPads = this.operatorsPads;
        return operatorsPads.map((pad, index) => (
            <TouchableOpacity
                style={styles.pad}
                key={index}
                onPress={() => this.handlePadPressed(pad)}
            >
                <Text style={styles.padText}>{pad.char}</Text>
            </TouchableOpacity>
        ));
    };

    render() {
        const { displayText, resultText } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.calculationText}>
                    <Text style={styles.text}>{displayText}</Text>
                </View>
                <View style={styles.resultText}>
                    <Text style={[styles.text, styles.result]}>{resultText}</Text>
                </View>
                <View style={styles.keyboard}>
                    <View style={styles.numbers}>{this.renderNumbersPad()}</View>
                    <View style={styles.operators}>{this.renderOperatorsPad()}</View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        padding: 20,
    },
    result: {
        fontSize: 25,
    },
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    pad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padText: {
        fontSize: 30,
        color: 'white',
    },
    calculationText: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    resultText: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    keyboard: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: '#434343',
    },
    operators: {
        flex: 1,
        backgroundColor: '#636363',
    },
});
