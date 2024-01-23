import { print } from './utils/print.js';

class Calculator {
    constructor() {
        this.currentInput = '';
        this.result = 0;
    }

    isOperator(char) {
        return /[+\-*\/]/.test(char) || char === ' ';
    }

    updateDisplay() {
        print(this.currentInput || this.result.toString());
    }

    countInString(str) {
        return new Function(`return ${str}`)();
    }

    appendNumber(number)  {
        this.currentInput += number;
        this.updateDisplay();
        return this;
    }

    addOperator(operator) {
        if (this.currentInput === '' && this.result !== 0) {
            this.currentInput = this.result.toString();
        }

        if (!this.isOperator(this.currentInput.slice(-1))) {
            this.currentInput += ` ${operator} `;
            this.updateDisplay();
        }
        return this;
    }

    calculate() {
        try {
            this.calculatedResult = this.countInString(this.currentInput.replaceAll('x', '*'));
            this.result = isFinite(this.calculatedResult) ? this.calculatedResult : 'Ошибка';
            this.currentInput = '';
            this.updateDisplay();
        } catch (error) {
            this.result = 'Error';
            this.updateDisplay();
        }
        return this;
    }

    clear() {
        this.currentInput = '';
        this.result = 0;
        this.updateDisplay();
        return this;
    }

    deleteLast() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
        return this;
    }
}

let main = () => {

    let calculator = new Calculator();

    return (state) => {
        switch (state) {
            case '=':
                calculator.calculate();
                break;
            case 'С':
                calculator.deleteLast();
                break;
            case 'АС':
                calculator.clear();
                break;
            default:
                if (/\d|\./.test(state)) {
                    calculator.appendNumber(state);
                } else if (/[+\-x/]/.test(state)) {
                    calculator.addOperator(state);
                }
        }
    };
}
export default main;