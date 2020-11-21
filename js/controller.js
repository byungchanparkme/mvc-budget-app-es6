class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bind("moveToOtherTab")
  }
}

export default Controller
