module.exports = function (upstream, downstream) {

  "use strict";

  // Pipe an array of streams to an array of streams
  if (Array.isArray(upstream) && Array.isArray(downstream)) {
    upstream.forEach(function (sender) {
      downstream.forEach(function (receiver) {
        sender.pipe(receiver);
      });
    });
  }

  // Pipe an array of streams to a single stream
  else if (Array.isArray(upstream) && !Array.isArray(downstream)) {
    upstream.forEach(function (sender) {
      sender.pipe(downstream);
    });
  }

  // Pipe a single stream to an array of streams
  else if (!Array.isArray(upstream) && Array.isArray(downstream)) {
    downstream.forEach(function (receiver) {
      upstream.pipe(receiver);
    });
  }

  // Pipe a single stream to a single stream
  else {
    upstream.pipe(downstream);
  }

};