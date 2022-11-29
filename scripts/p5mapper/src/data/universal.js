p5.prototype.setupLibs = function () {
  setupMidi();
  rectMode(CENTER);
  colorMode(HSB);
  frameRate(60);
  angleMode(DEGREES);

  background(0);
  setupAudio();
  initPalette();
};

p5.prototype.setupLibsSimple = function () {
  setupMidi();
  setupAudio();
  initPalette();
};

p5.prototype.updateLibs = function (shouldClear = true) {
  updateAudio();
  try {
    setConfig();
  } catch (error) {
    print("setConfig not defined!");
  }

  if (frameCount % 400 === 0) {
    persistMidiValues();
  }

  let x = getMidi(10, width, width / 2) - width / 2;
  let y = getMidi(11, height, height / 2) - height / 2;
  let scale_amount = getMidi(12, 1, 0.5) + 0.5;
  scale(scale_amount);
  translate(x, y, 0);

  shouldClear && background(0, C.bgTrans);
};
