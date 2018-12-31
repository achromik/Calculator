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
import { numberRegExp } from './src/numberRegExp';

const initialCalculatorState = {
    calculationText: '0',
    displayText: '0',
    resultText: '',
};

export default class App extends Component {
    state = {
        ...initialCalculatorState,
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

    isLastNumberZero = () => {
        const { calculationText } = this.state;

        const lastNumber = calculationText.match(numberRegExp);
        return lastNumber && lastNumber[0] === ZERO;
    };

    clearCalculator = () => {
        this.setState({
            ...initialCalculatorState,
        });
    };

    calculate = () => {
        return eval(this.state.calculationText);
    };

    handleDotPad = () => {
        const { calculationText, displayText } = this.state;
        const leadingZero = ZERO;

        const isLastNumberContainDot = () => {
            const lastNumber = calculationText.match(numberRegExp);
            return lastNumber && lastNumber[0].contains(DOT);
        };

        if (this.isLastCharOperator()) {
            this.setState({
                calculationText: calculationText + leadingZero + DOT,
                displayText: displayText + leadingZero + DOT,
            });
            return;
        }

        if (this.isLastCharDot() || isLastNumberContainDot()) {
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

    handleCalculatePad = () => {
        this.setState({
            resultText: this.calculate(),
        });
    };

    handleDeleteOperator = () => {
        const { calculationText, displayText, resultText } = this.state;

        if (resultText) {
            this.clearCalculator();
            return;
        }

        if (calculationText.length === 1) {
            this.setState({
                ...initialCalculatorState,
            });
            return;
        }

        this.setState({
            calculationText: calculationText.slice(0, -1),
            displayText: displayText.slice(0, -1),
        });
    };

    handleZeroPad = text => {
        const { calculationText, displayText } = this.state;

        if (this.isLastNumberZero()) return;

        this.setState({
            calculationText: calculationText + text,
            displayText: displayText + text,
        });
    };

    handlePadPressed = text => {
        const { calculationText, displayText } = this.state;

        switch (text) {
            case CALCULATE_OPERATOR:
                this.handleCalculatePad();
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
                if (this.isLastNumberZero()) {
                    this.setState({
                        calculationText: calculationText.slice(0, -1) + text,
                        displayText: displayText.slice(0, -1) + text,
                    });
                    return;
                }

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
