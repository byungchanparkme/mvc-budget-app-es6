class Storage {
  constructor(name) {
    this._dbName = name
    if (!localStorage.getItem(name)) {
      const initData = { entries: [] }
      localStorage.setItem(this._dbName, JSON.stringify(initData))
    }
  }

  save(data, callback) {
    const currentData = JSON.parse(localStorage.getItem(this._dbName))
    const entries = currentData.entries
    const newEntry = {
      type: data.type,
      title: data.title,
      amount: data.amount,
    }
    entries.push(newEntry)
    localStorage.setItem(this._dbName, JSON.stringify(currentData))
    callback.call(this, newEntry)
  }

  findAll(callback) {
    const currentData = JSON.parse(localStorage.getItem(this._dbName))
    const entries = currentData.entries
    callback.call(this, entries)
  }

  find(data, callback) {
    const currentData = JSON.parse(localStorage.getItem(this._dbName))
    const entries = currentData.entries
    const targetId = data.id
    const targetItem = entries.splice(targetId, 1)[0]
    console.log(targetItem)
    localStorage.setItem(this._dbName, JSON.stringify(currentData))
    callback.call(this, { ...targetItem, id: targetId })
  }
}

export default Storage
