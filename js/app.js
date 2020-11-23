import Model from "./model.js"
import View from "./view.js"
import Controller from "./controller.js"
import Storage from "./storage.js"
import Template from "./template.js"
import Chart from "./chart.js"

class App {
  constructor() {
    this.storage = new Storage("entry_list")
    this.model = new Model(this.storage)
    this.template = new Template()
    this.chart = new Chart()
    this.view = new View(this.template, this.chart)
    this.controller = new Controller(this.model, this.view)
  }
}

const app = new App()
