import MovePoint from "../surfaces/MovePoint";

import { inside, getRandomizedColor, isWEBGL } from "../helpers/helpers";

class Mask {
  constructor(id, numPoints) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.clickX = 0;
    this.clickY = 0;
    this.xStartDrag = this.x;
    this.yStartDrag = this.y;
    this.type = "MASK";
    this.controlPointColor = getRandomizedColor(this.id, this.type);

    this.points = [];

    for (let i = 0; i < numPoints; i++) {
      let r = 200;
      let x = r * cos((i / numPoints) * 2 * PI);
      let y = r * sin((i / numPoints) * 2 * PI);
      if (!isWEBGL()) {
        x += width / 2;
        y += height / 2;
      }
      let cp = new MovePoint(this, x, y);
      cp.isControlPoint = true;
      this.points.push(cp);
    }
  }

  setPoints(pts) {
    this.points = [];
    for (const p of pts) {
      let cp = new MovePoint(this, p.x, p.y);
      cp.isControlPoint = true;
      this.points.push(cp);
    }
  }

  display(col = color(0)) {
    push();
    translate(this.x, this.y, 1);
    noStroke();
    if (isCalibratingMapper()) fill(this.controlPointColor);
    else {
      fill(col);
      stroke(col);
    }
    beginShape();
    for (const point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();
    pop();
  }

  displayControlPoints() {
    push();
    translate(this.x, this.y, 2);
    for (const p of this.points) {
      p.display(this.controlPointColor);
    }
    pop();
  }

  isMouseOver() {
    let p = { x: mouseX, y: mouseY };
    if (isWEBGL()) {
      p.x -= width / 2;
      p.y -= height / 2;
    }
    let ins = inside(p, this.points, { x: this.x, y: this.y });
    return ins;
  }

  load(json) {
    const { x, y, points } = json;
    this.x = x;
    this.y = y;

    for (const point of points) {
      let mp = this.points[point.i];
      mp.x = point.x;
      mp.y = point.y;
    }
  }

  getJson() {
    let sJson = {};
    sJson.id = this.id;
    sJson.x = this.x;
    sJson.y = this.y;
    sJson.type = this.type;
    sJson.points = [];

    for (let i = 0; i < this.points.length; i++) {
      let point = {};
      point.i = i;
      point.x = this.points[i].x;
      point.y = this.points[i].y;
      sJson.points.push(point);
    }
    return sJson;
  }

  isEqual(json) {
    return json.type === this.type && json.id === this.id;
  }

  select() {
    // check control points
    for (const p of this.points) {
      if (p.isMouseOver()) {
        p.startDrag();
        return p;
      }
    }
    // then, see if the mask itself is selected
    if (this.isMouseOver()) {
      this.startDrag();
      return this;
    }
    return null;
  }

  startDrag() {
    this.xStartDrag = this.x;
    this.yStartDrag = this.y;
    this.clickX = mouseX;
    this.clickY = mouseY;
  }

  moveTo() {
    this.x = this.xStartDrag + mouseX - this.clickX;
    this.y = this.yStartDrag + mouseY - this.clickY;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

export default Mask;
