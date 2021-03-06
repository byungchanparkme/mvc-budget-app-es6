class View {
  constructor(template, chart) {
    this.template = template
    this.chart = chart

    this.balanceEl = document.querySelector(".balance .value")
    this.incomeTotalEl = document.querySelector(".income-total")
    this.outcomeTotalEl = document.querySelector(".outcome-total")
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
    this.dashBoard = document.querySelector(".budget-dashboard")
  }

  bind(event, handler) {
    this.dashBoard.addEventListener("click", (evt) => {
      const target = evt.target
      if (event === "moveToOtherTab") {
        this._moveToOtherTab(target)
      } else if (event === "addExpenseItem") {
        if (target.parentElement.className === "add-expense") {
          console.log("addExpenseBtn called")
          const title = this.expenseTitle.value
          const amount = this.expenseAmount.value
          handler({ type: "expense", title: title, amount: amount })
        }
      } else if (event === "addIncomeItem") {
        if (target.parentElement.className === "add-income") {
          console.log("addIncomeBtn called")
          const title = this.incomeTitle.value
          const amount = this.incomeAmount.value
          handler({ type: "income", title: title, amount: amount })
        }
      } else if (event === "deleteItem") {
        if (target.id === "delete") {
          const targetId = parseInt(target.parentElement.id, 10)
          console.log(targetId)
          handler({ id: targetId })
        }
      } else if (event === "editItem") {
        if (target.id === "edit") {
          console.log("edit button called")
          const targetId = parseInt(target.parentElement.id, 10)
          handler({ id: targetId })
        }
      }
    })
  }

  render(viewCmd, data) {
    const viewCommands = {
      showEntries: () => {
        this._showEntries(data)
      },
      showCurrentStatus: () => {
        this._showCurrentStatus(data)
      },
      clearInputs: () => {
        this._clearInputs()
      },
      deleteItem: () => {
        this._deleteItem(data)
      },
      editItem: () => {
        this._editItem(data)
      },
      displayChart: () => {
        this._displayChart(data)
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

  _moveToOtherTab(target) {
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

  _showCurrentStatus(data) {
    // 먼저 income 과 outcome 계산
    // const outcome = data.filter((item) => item.type === "expense")
    // const income = data.filter((item) => item.type === "income")

    // const outcomeTotal = this._calculateTotal(outcome)
    // const incomeTotal = this._calculateTotal(income)
    const { outcomeTotal, incomeTotal } = this._calculateIncomeAndOutcome(data)
    const balance = this._calculateBalance(outcomeTotal, incomeTotal)

    this.balanceEl.textContent = balance < 0 ? `-$${-balance}` : `$${balance}`
    this.outcomeTotalEl.textContent = `$${outcomeTotal}`
    this.incomeTotalEl.textContent = `$${incomeTotal}`
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
  _deleteItem(data) {
    let targetItem = data.type === "expense" ? this._findTargetItem(this.expenseList.children, data) : this._findTargetItem(this.incomeList.children, data)
    let targetItemOnAll = this._findTargetItem(this.allList.children, data)

    this.allList.removeChild(targetItemOnAll)
    if (targetItem.className === "expense") {
      this.expenseList.removeChild(targetItem)
    } else if (targetItem.className === "income") {
      this.incomeList.removeChild(targetItem)
    }
  }
  _findTargetItem(elemList, data) {
    const children = Array.from(elemList)
    let targetItem
    children.forEach((child) => {
      for (let p in data) {
        if (data[p] == child[p]) {
          targetItem = child
        }
      }
    })
    return targetItem
  }

  _calculateIncomeAndOutcome(data) {
    // 먼저 income 과 outcome 계산
    if (!data.length) return { outcomeTotal: 0, incomeTotal: 0 }
    const outcome = data.filter((item) => item.type === "expense")
    const income = data.filter((item) => item.type === "income")

    const outcomeTotal = this._calculateTotal(outcome)
    const incomeTotal = this._calculateTotal(income)

    return { outcomeTotal, incomeTotal }
  }

  _calculateTotal(amounts) {
    if (!amounts.length) return 0
    return amounts.reduce((a, b) => a + Number(b.amount), 0)
  }

  _calculateBalance(outcome, income) {
    return income - outcome
  }

  _editItem(data) {
    if (data.type === "expense") {
      this.expenseTitle.value = data.title
      this.expenseAmount.value = data.amount
      this.expenseTitle.focus()
    } else if (data.type === "income") {
      this.incomeTitle.value = data.title
      this.incomeAmount.value = data.amount
      this.incomeTitle.focus()
    }
  }

  _displayChart(data) {
    const { outcomeTotal, incomeTotal } = this._calculateIncomeAndOutcome(data)

    this.chart.updateChart(incomeTotal, outcomeTotal)
  }
}

export default View
