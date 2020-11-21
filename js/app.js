import Model from "./model"
import View from "./voew"
import Controller from "./controller"
import Storage from "./storage"
import Template from "./template"

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
