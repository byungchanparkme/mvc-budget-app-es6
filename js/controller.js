class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.showEntries()
    this.view.bind("moveToOtherTab")
    this.view.bind("addExpenseItem", (data) => {
      this.addExpenseItem(data)
    })
    this.view.bind("addIncomeItem", (data) => {
      this.addIncomeItem(data)
    })
    this.view.bind("deleteItem", (data) => {
      this.deleteItem(data)
    })
  }

  showEntries() {
    this.model.read((data) => {
      this.view.render("showEntries", data)
    })
  }

  addExpenseItem(data) {
    this.model.create(data, (data) => {
      this.view.render("clearInputs", data)
    })
    this.showEntries()
  }

  addIncomeItem(data) {
    this.model.create(data, (data) => {
      this.view.render("clearInputs", data)
    })
    this.showEntries()
  }

  deleteItem(data) {
    this.model.update(data, (data) => {
      console.log(data)
      this.view.render("deleteItem", data)
    })
  }
}

export default Controller
