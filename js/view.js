class View {
  constructor(template) {
    this.template = template

    this.expenseBtn = document.querySelector(".tab1")
    this.incomeBtn = document.querySelector(".tab2")
    this.allBtn = document.querySelector(".tab3")
    this.tabList = document.querySelector(".budget-dashboard .toggle")
    this.incomeEl = document.querySelector("#income")
    this.expenseEl = document.querySelector("#expense")
    this.allEl = document.querySelector("#all")
    this.addExpense = document.querySelector(".add-expense")
    this.expenseTitle = document.getElementById("expense-title-input")
    this.expenseAmount = document.getElementById("expense-amount-input")
    this.addIncome = document.querySelector(".add-income")
    this.incomeTitle = document.getElementById("income-title-input")
    this.incomeAmount = document.getElementById("income-amount-input")
  }

  bind(event, handler) {
    if (handler) {
    } else {
      if (event === "moveToOtherTab") {
        this.tabList.addEventListener("click", (event) => {
          const target = event.target
          console.log(target)
          if (target.classList.contains("tab1")) {
            this._active(this.expenseBtn)
            this._inactive([this.incomeBtn, this.allBtn])
            this._show(this.expenseEl)
            this._hide([this.incomeEl, this.allEl])
          } else if (target.classList.contains("tab2")) {
            this._active(this.incomeBtn)
            this._inactive([this.expenseBtn, this.allBtn])
            this._show(this.incomeEl)
            this._hide([this.expenseEl, this.allEl])
          } else if (target.classList.contains("tab3")) {
            this._active(this.allBtn)
            this._inactive([this.expenseBtn, this.incomeBtn])
            this._show(this.allEl)
            this._hide([this.expenseEl, this.incomeEl])
          }
        })
      }
    }
  }

  _show(element) {
    element.classList.remove("hide")
  }
  _hide(elements) {
    elements.forEach((element) => element.classList.add("hide"))
  }
  _active(element) {
    element.classList.add("active")
  }
  _inactive(elements) {
    elements.forEach((element) => element.classList.remove("active"))
  }
}

export default View
