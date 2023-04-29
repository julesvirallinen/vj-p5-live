// TODO: allow disabling these

export const ALWAYS_LOADED_SCRIPTS = [
  {
    id: 'ramda',
    path: '/js/ramda.min.js',
  },
  {
    id: 'p5jssound',
    path: '/js/p5.sound.min.js',
  },
  {
    id: 'webmidi',
    path: '/js/webmidi.min.js',
  },
  // TODO: the code of the build in helpers should be able to be modified in the app!
  {
    id: 'audioHelper',
    path: '/js/setupAudio.js',
  },
];
