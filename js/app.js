import Model from "./model.js"
import View from "./view.js"
import Controller from "./controller.js"
import Storage from "./storage.js"
import Template from "./template.js"

class App {
  constructor() {
    this.storage = new Storage("entry_list")
    this.model = new Model(this.storage)
    this.template = new Template()
    this.view = new View(this.template)
    this.controller = new Controller(this.model, this.view)
  }
}

new App()
