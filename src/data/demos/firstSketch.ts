import { HIROSHIGE } from '~/data/palette/defaultPalettes';
import { ICurrentSketch, ISettingsSketch } from '~/models/sketch';
import { keyMap } from '~/providers/ShortcutProvider';

const firstSketchCode = `
// Welcome to unnamed p5.js live-coding app!

// code updates as you write
// ${keyMap.COMPILE} to run setup again ("compile")
// ${keyMap.HARD_COMPILE} to completely recreate sketch (if it borks or something)

// change all the numbers and see what happens!

function setup() {
    colorMode(HSB); // required for palette for now (color(HUE, SATURATION, BRIGHTNESS))
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES); // default is RADIANS, but this is easier to start with

    background(0);
    strokeWeight(10); // border width

    // The app has support for saved color palettes!
    // Try commenting this out and selecting another palette from the settings -> it will be remembered for this sketch!
    // Press ${keyMap.SHOW_PALETTE_MENU} to show the palette menu!
    P.setPalette("hiroshige");
}

function draw() {
    SIZE = 100;
    translate(windowWidth / 2, windowHeight / 2); // center what you're doing

    background(0, 0.1); // background with opacity to leave a ghost trail 👻

    let XLOC = 0;
    // 1. uncomment this line to make the squares move back and forth!
    // XLOC = map(sin(frameCount), 0, 1, -100, 100);

    noStroke(); //remove edge stroke

    // get first color in palette array
    fill(P.getI(0));
    // normal everyday rectangle
    rect(XLOC, -300, SIZE, SIZE);

    stroke(P.getI(1)); // Fill with first color in palette
    noFill();
    // rectangle with rounded corners (circle!?)
    rect(XLOC, -100, SIZE, SIZE, 100);

    for (let i = 0; i < 10; i++) {
        noStroke(); // no border
        fill(P.getI(i, 0.5)); // apply 0.5 transparency to colors!
        // 2. uncomment this line to add 10 little squares!
        //  rect((i - 4) * 40 + XLOC, 100, SIZE / 10, SIZE / 10);
    }
}
`;

const FIRST_SKETCH_ID = 'TUTORIAL1';

export const firstSketchMenuItem: ISettingsSketch = {
  name: 'tutorial1',
  id: FIRST_SKETCH_ID,
  paletteName: HIROSHIGE.name,
};

export const firstSketchLocalStorage: ICurrentSketch = {
  code: firstSketchCode,
  id: FIRST_SKETCH_ID,
};
