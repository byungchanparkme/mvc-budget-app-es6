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
    this.addExpenseBtn = document.querySelector(".add-expense")
    this.expenseTitle = document.getElementById("expense-title-input")
    this.expenseAmount = document.getElementById("expense-amount-input")
    this.addIncomeBtn = document.querySelector(".add-income")
    this.incomeTitle = document.getElementById("income-title-input")
    this.incomeAmount = document.getElementById("income-amount-input")
    this.incomeList = document.querySelector("#income .list")
    this.expenseList = document.querySelector("#expense .list")
    this.allList = document.querySelector("#all .list")
  }

  bind(event, handler) {
    if (handler) {
      if (event === "addExpenseItem") {
        this.addExpenseBtn.addEventListener("click", () => {
          const title = this.expenseTitle.value
          const amount = this.expenseAmount.value
          handler({ type: "expense", title: title, amount: amount })
        })
      } else if (event === "addIncomeItem") {
        this.addIncomeBtn.addEventListener("click", () => {
          const title = this.incomeTitle.value
          const amount = this.incomeAmount.value
          handler({ type: "income", title: title, amount: amount })
        })
      }
    } else {
      if (event === "moveToOtherTab") {
        this.tabList.addEventListener("click", (event) => {
          const target = event.target
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

  render(viewCmd, data) {
    const viewCommands = {
      showEntries: () => {
        this._showEntries(data)
      },
      addExpenseItem: () => {
        // this._addItem(data)
      },
      addIncomeItem: () => {},
      clearInputs: () => {
        this._clearInputs()
      },
    }
    viewCommands[viewCmd]()
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
  _showEntries(data) {
    this.expenseList.innerHTML = ""
    this.incomeList.innerHTML = ""
    this.allList.innerHTML = ""
    const entryDomList = this.template.insert(data)
    for (let i = 0; i < entryDomList.length; i++) {
      if (entryDomList[i].indexOf("expense") > -1) {
        this.expenseList.innerHTML += entryDomList[i]
      } else if (entryDomList[i].indexOf("income") > -1) {
        this.incomeList.innerHTML += entryDomList[i]
      }
      this.allList.innerHTML += entryDomList[i]
    }
  }
  _clearInputs() {
    if (this.expenseBtn.classList.contains("active")) {
      this.expenseTitle.value = ""
      this.expenseAmount.value = ""
      this.expenseTitle.focus()
    } else if (this.incomeBtn.classList.contains("active")) {
      this.incomeTitle.value = ""
      this.incomeAmount.value = ""
      this.incomeTitle.focus()
    }
  }
}

export default View
