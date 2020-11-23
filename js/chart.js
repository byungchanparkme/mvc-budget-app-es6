class Chart {
  constructor() {
    this.chart = document.querySelector(".chart")
    this.canvas = this.makeCanvas()
    this.chart.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    this.ctx.lineWidth = 8
    this.radius = 20
  }

  makeCanvas() {
    const canvas = document.createElement("canvas")
    canvas.width = 50
    canvas.height = 50
    return canvas
  }

  updateChart(income, outcome) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    let ratio = income / (income + outcome)

    this.drawCircle("#FFFFFF", -ratio, true)
    this.drawCircle("#F0624D", 1 - ratio, false)
  }

  drawCircle(color, ratio, anticlockwise) {
    this.ctx.strokeStyle = color
    this.ctx.beginPath()
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.radius, 0, ratio * 2 * Math.PI, anticlockwise)
    this.ctx.stroke()
  }
}

export default Chart
