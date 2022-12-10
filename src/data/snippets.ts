// ala P5LIVE
export const windowResizer = `function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}`;

export const customEase = `
function ease(iVal, oVal, eVal){
  return oVal += (iVal - oVal) * eVal;
}`;

export const processingLoggingCompatability = `
function println(msg){
  print(msg);
}`;

export const defaultSketchCode = `

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  
}

`;
