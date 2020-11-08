class Calculator {
  constructor(prevOperandTextElt, currentOperandTextElt) {
    this.prevOperandTextElt = prevOperandTextElt;
    this.currentOperandTextElt = currentOperandTextElt;
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendDigit(digit) {
    if (digit === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + digit.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.prevOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
      case '-':
        computation = prev - current
        break;
      case '*':
        computation = prev * current
        break;
      case '/':
        computation = prev / current
        break;
      default:
        return
    }
    this.currentOperand = computation
    this.prevOperand = ''
    this.operation = undefined
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElt.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.prevOperandTextElt.innerText =
        `${this.prevOperand} ${this.operation}`
    } else {
      this.prevOperandTextElt.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandTextElt = document.querySelector('[data-prev-operand]')
const currentOperandTextElt = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandTextElt, currentOperandTextElt)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendDigit(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
