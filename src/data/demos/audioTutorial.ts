import { KLIMT } from '~/data/palette/defaultPalettes';
import { ICurrentSketch, ISettingsSketch } from '~/models/sketch';

const audioTutorialCode = `
// You can use the p5.audio library any way you like (it's preloaded) or 
// you can use the provided (updateAudio and setupAudio) commands!

// It provides the following values:
// amp: overall volume
// fft: waveform array https://p5js.org/reference/#/p5.FFT
// beatCount: beat number

function setup() {
    createCanvas(windowWidth, windowHeight)

    rectMode(CENTER)
    colorMode(HSB)
    setupAudio() // add this to setup to use audio!
    background(0)
}

function draw() {
    updateAudio({
        beatDetectionOn: true, ampMulti: 1
    }) // and this to draw to update on every draw loop!
    background(0)

    // wrapping inside push(), pop() applies the translate only everything in between
    push()
    translate(windowWidth/2, windowHeight/2)
    fill(P.getI(0))
    rect(-200, -200, 100 + amp, 100 + amp, 100) // this circle should pulse to the music
    fill(P.getI(1))
    rect(200, -200, 100 + ampEase, 100 + ampEase, 100) // this one is "eased", so the movements are smoother
    
    // The beatcounter isn't great, but works suprisingly often! 
    text("Beatcount: " + beatCount, -30, -200)
    onBeat && text("on beat?", -20, -150)
    pop()
    

    let waveform = fftEase // try changing fft to fftEase to apply ease to it too!

    waveform.forEach((value, i) => {
        fill(P.getI(i))
        rect(windowWidth/fft.length * i, 500, 10, value)
    })



}
`;

const TUTORIAL_ID = 'AUDIOTUTORIAL1';

export const tutorial2Menuitem: ISettingsSketch = {
  name: 'audio tutorial',
  id: TUTORIAL_ID,
  paletteName: KLIMT.name,
};

export const tutorial2LocalStorage: ICurrentSketch = {
  code: audioTutorialCode,
  id: TUTORIAL_ID,
};
