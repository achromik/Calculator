import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DELETE_OPERATOR = '⌫';
const ADDITION_OPERATOR = '+';
const SUBTRACTION_OPERATOR = '-';
const MULTIPLICATION_OPERATOR = '*';
const DIVISION_OPERATOR = '/';
const CALCULATE_OPERATOR = '=';
const DOT = '.';
const ZERO = '0';

export default class App extends Component {
    state = {
        calculationText: '',
        resultText: '',
    };

    numbersPads = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        [DOT, ZERO, CALCULATE_OPERATOR],
    ];

    operatorsPads = [
        DELETE_OPERATOR,
        ADDITION_OPERATOR,
        SUBTRACTION_OPERATOR,
        MULTIPLICATION_OPERATOR,
        DIVISION_OPERATOR,
    ];
    handlePadPressed = text => {
    };
    renderNumbersPad = () => {
        const numbersPads = this.numbersPads;
        return numbersPads.map((row, index) => (
            <View key={index} style={styles.row}>
                {row.map(key => (
                    <TouchableOpacity
                        style={styles.pad}
                        key={key}
                        onPress={() => this.handlePadPressed(key)}
                    >
                        <Text style={styles.padText}>{key}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ));
    };

    renderOperatorsPad = () => {
        const operatorsPads = this.operatorsPads;
        return operatorsPads.map((pad, index) => (
            <TouchableOpacity
                style={styles.pad}
                key={index}
                onPress={() => this.handlePadPressed(pad)}
            >
                <Text style={styles.padText}>{pad}</Text>
            </TouchableOpacity>
        ));
    };

    render() {
        const { calculationText, resultText } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.calculationText}>
                    <Text style={styles.text}>{calculationText}</Text>
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
