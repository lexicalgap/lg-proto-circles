import { Application, Container, Graphics, Filter, Rectangle, Sprite } from 'pixi.js'
import { createRect } from './utils'
import MFrag from './m.frag'

const width = window.innerWidth
const halfWidth = width >> 1
const height = window.innerHeight
const halfheight = height >> 1

const app = new Application({
  width,
  height,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  backgroundColor: 0xfffffff
})

let time = 0

// first container
const c1 = createCircleContainer(width * 0.45, height >> 1, 30, 2, 10)
let tx1 = app.renderer.generateTexture(c1, 1 ,1)
tx1.trim = new Rectangle(0, 0, width, height)

// second container
const c2 = createCircleContainer(width * 0.55, height >> 1, 40, 2, 10)
let tx2 = app.renderer.generateTexture(c2, 1, 1)
tx2.trim = new Rectangle(0, 0, width, height)

// bg color doesnt matter
// the filter will olny ooutput the insersctions
const bg = createRect(0, 0, width, height, 0x0000ff)
app.stage.addChild(bg)

const mFilter = new Filter(null, MFrag, { tx1, tx2 })
bg.filters = [mFilter]

app.ticker.add(() => {
  time += 0.01

  c1.group.x = Math.cos(time) * 200 + 200
  c1.group.y = Math.sin(time * 0.3) * 200 + halfheight - c1.group.height
  app.renderer.render(c1, tx1)

  c2.group.x = Math.cos(time * 0.2) * 100 + 100
  c2.group.y = Math.sin(time * 0.15) * 100 + halfheight - c2.group.height
  app.renderer.render(c2, tx2)
})

window.onmouseup = () => {
  bg.visible = !bg.visible
}

window.onload = () => {
  document.body.appendChild(app.view)
  app.start()
}

function createCircleContainer (x, y, radius, startSegment = 1, endSegment = 30) {
  const c = new Container()
  const bg = new Graphics()
  bg.beginFill(0x0000ff, 0)
  bg.drawRect(0, 0, width, height)
  bg.endFill()
  c.addChild(bg)

  const group = new Graphics()
  for (var i = startSegment; i < endSegment; i++) {
    group.lineStyle(radius >> 1, 0x00, 1)
    group.drawCircle(x,y, radius * i )
  }

  c.group = group
  c.addChild(group)
  app.stage.addChild(c)
  return c
}
