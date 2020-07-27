class Calculator{
    constructor(currentScreenTextElement){
        this.currentScreenTextElement=currentScreenTextElement;
        this.clear();
    }

    clear(){
        this.currentScreen='';
        this.operation=undefined;
    }

    addNumber(number){
        if(number==='.' && this.currentScreen.includes('.')) return;
        this.currentScreen=this.currentScreen.toString()+number.toString();
    }

    chooseOperation(operation){
        
    }

    compute(){

    }

    updateDisplay(){
        this.currentScreenTextElement.innerText=this.currentScreen;
    }
}

const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operator]');
const equalsButton=document.querySelector('[data-equals]');
const clearButton=document.querySelector('[data-all-clear]');
const currentScreenTextElement=document.querySelector('[data-screen]');

const calculator=new Calculator(currentScreenTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
       calculator.addNumber(button.innerText);
       calculator.updateDisplay(); 
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
       calculator.chooseOperation(button.innerText);
       calculator.updateDisplay(); 
    })
})


