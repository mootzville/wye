# Wye Splitter for Node Streams

In plumbing, a wye fitting is used for splitting a stream into multiple streams
or merging multiple streams into a single stream.  The sole purpose of this module
is to do exactly that.

## What it looks like:

```
// upstream is the Readable stream (i.e. process.stdin)
// downstream is the Writable stream (i.e. process.stdout)
wye(upstream, downstream);
```

### A Contrived Example:
```
var Transform = require('stream').Transform,
    // Let's create an array of transform streams
    tArr = [Transform(), Transform(), Transform()],
    wye = require('wye.js');

// Attach the required _transform method to each stream
// Node API Docs has more info on Transform streams...
tArr.forEach(function (val, ind, arr) {

  // Do some trivial stuff to show things work...
  // This will append some text to the chunk, so
  // you know what stream it came from. 
  tArr[ind]._transform = function (chunk, encoding, done) {
    chunk = 'tArr' + ind + ': ' + chunk;
    tArr[ind].push(chunk);
    done();
  };

});

// Now we use the wye splitter to pipe our array of streams

// stdin --pipe--> stream array
wye(process.stdin, tArr);

// stream array --pipe--> stdout
wye(tArr, process.stdout);
```

### You can also pipe arrays of streams to arrays of streams in the same manner.

```
streamArray1 = [stream1, stream2, stream3];
streamArray2 = [stream4, stream5, stream6];

// wye will handle all of the piping
wye(streamArray1, streamArray2);
```

### The above example achieves the same as:
```
stream1.pipe(stream4);
stream1.pipe(stream5);
stream1.pipe(stream6);
stream2.pipe(stream4);
stream2.pipe(stream5);
stream2.pipe(stream6);
stream3.pipe(stream4);
stream3.pipe(stream5);
stream3.pipe(stream6);
```

### Just because...
```
wye(process.stdin, process.stdout);

// is the same as...

process.stdin.pipe(process.stdout);
```

### Wye not?