class Model {
  constructor(storage) {
    this.storage = storage
  }

  read(callback) {
    this.storage.findAll(callback)
  }

  create(data, callback) {
    this.storage.save(data, callback)
  }

  update(data, callback) {
    this.storage.find(data, callback)
  }
}

export default Model
