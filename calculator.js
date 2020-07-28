class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    deleteOne(){
        this.currentScreen=this.currentScreen.slice(0,-1)
    }

    clear() {
        this.currentScreen = '';
        this.previousScreen = '';
        this.operation = undefined;
    }

    addNumber(number) {
        if (number === '.' && this.currentScreen.includes('.')) return;
        this.currentScreen = this.currentScreen.toString() + number.toString();
    }

    chooseOperator(operator) {
        if (this.currentScreen === '') return;
        if (this.previousScreen !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousScreen = this.currentScreen;
        this.currentScreen = '';
    }

    compute() {
        let sum;
        let current = parseFloat(this.currentScreen);
        let previous = parseFloat(this.previousScreen);
        if (this.currentScreen === '' || this.previousScreen === '') return;
        if (previous === NaN || current === NaN) return;

        function dividend(n) {
            n = +n;
            if (!n) { 
                alert('cant divide by zero, sorry😥')
                throw new Error('Invalid dividend ' + n);
            }
            return n;
        }
        switch (this.operator) {
            case '+':
                sum = previous + current;
                break
            case '-':
                sum = previous - current;
                break
            case '×':
                sum = previous * current;
                break
            case '÷':
                sum = previous / dividend(current);
                break
            default:
                return;
        }
        this.currentScreen = sum;
        this.operation = undefined;
        this.previousScreen = '';

    }

    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentScreen;
        this.previousScreenTextElement.innerText = this.previousScreen;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const currentScreenTextElement = document.querySelector('[data-screen-current]');
const previousScreenTextElement = document.querySelector('[data-screen-previous]');
const deleteButton=document.querySelector('[data-delete]');

const calculator = new Calculator(currentScreenTextElement, previousScreenTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteOne();
    calculator.updateDisplay();
})