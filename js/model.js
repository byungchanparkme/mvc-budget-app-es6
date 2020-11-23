class Model {
  constructor(storage) {
    this.storage = storage
  }

  read(data, callback) {
    const dataType = typeof data
    callback = callback || function () {}

    if (dataType === "function") {
      callback = data
      return this.storage.findAll(callback)
    } else {
      return this.storage.find(data, callback)
    }
  }

  create(data, callback) {
    this.storage.save(data, callback)
  }

  update(data, callback) {
    this.storage.find(data, callback)
  }
}

export default Model
