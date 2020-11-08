class BinomialCalculator {
  constructor(resultTextElt) {
    this.resultTextElt = resultTextElt
  }

  factorial(number) {
    let result = 1
    for (var i = 1; i <= number; i++) {
      result = result * i
    }
    return result
  }

  compute() {
    let num
    let n = document.getElementById("upper").value
    let k = document.getElementById("lower").value
    n = parseInt(n)
    k = parseInt(k)
    if (isNaN(n) || isNaN(k)) return
    if (n <= 0 || k <= 0) return
    num = n - k
    n = this.factorial(n)
    k = this.factorial(k)
    num = this.factorial(num)
    num = n / (k*num)
    this.resultTextElt.innerText = num.toLocaleString('en')
  }
}

const resultTextElt = document.querySelector('[data-binomial-result]')
const solveButton = document.querySelector('[solveButton]')

const calc = new BinomialCalculator(resultTextElt)

solveButton.addEventListener('click', () => {
  calc.compute()
})
