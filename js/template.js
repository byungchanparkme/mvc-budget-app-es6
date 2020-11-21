class Template {
  constructor() {
    this.defaultTemplate = `
      <li id="{{id}}" class="{{type}}">
        <div class="entry">{{title}}: $ {{amount}}</div>
        <div id="edit"></div>
        <div id="delete"></div>
      </li>
    `
  }

  insert(data) {
    if (data.length === 0) return ""
    let entryDomList = []
    let template
    data.forEach((item, idx) => {
      template = this.defaultTemplate
      template = template.replace("{{id}}", idx)
      template = template.replace("{{type}}", item.type)
      template = template.replace("{{title}}", item.title)
      template = template.replace("{{amount}}", item.amount)
      template = template.replace(/(^\s+)|(\s+$)/g, "")
      template = template.replace(/>(\s+)</g, "><")
      entryDomList.push(template)
    })

    return entryDomList
  }
}

export default Template
