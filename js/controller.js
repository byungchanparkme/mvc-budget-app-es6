class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.showEntries()
    this.view.bind("moveToOtherTab")
    this.view.bind("addExpenseItem", (data) => {
      this.model.create(data, (data) => {
        console.log(data)
        this.view.render("addExpenseItem", data)
      })
      this.view.bind("clearInputs")
    })
    this.view.bind("addIncomeItem", (data) => {
      this.model.create(data, (data) => {
        this.view.render("addIncomeItem", data)
      })
      this.view.bind("clearInputs")
    })
  }

  showEntries() {
    this.model.read((data) => {
      this.view.render("showEntries", data)
    })
  }
}

export default Controller
