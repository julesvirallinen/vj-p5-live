export const errorSnippet = `
window.onerror = function (msg, url, lineNumber) {
  var data = { msg, lineNumber, source: 'sketch' };
  window.parent.postMessage(JSON.stringify(data), '*');

  return false;
};`;

// TODO:  catch rejected promises
// window.onunhandledrejection = function (event) {
//   if (event.reason && event.reason.message && event.reason.stack) {
//     window.parent.postMessage(
//       [
//         {
//           log: [
//             {
//               method: "error",
//               data: [
//                 JSON.stringify({
//                   message: event.reason.message,
//                   stack: event.reason.stack,
//                 }),
//               ],
//               id: Date.now().toString(),
//             },
//           ],
//           source: "iframeWindow",
//         },
//       ],
//       "*"
//     );
//   }
// };
