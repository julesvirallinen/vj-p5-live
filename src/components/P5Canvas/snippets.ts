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
