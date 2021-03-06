# Aural-Scala

[![Build Status](https://travis-ci.org/kchapelier/aural-scala.svg)](https://travis-ci.org/kchapelier/aural-scala) [![NPM version](https://badge.fury.io/js/aural-scala.svg)](http://badge.fury.io/js/aural-scala)

A codec for Scala scale files.

## Intent

The [Scala scale file format](http://www.huygens-fokker.org/scala/scl_format.html) is the de facto standard for the description and the exchange of scales and system of tuning.

This module provides a decoder and an encoder for the format.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install aural-scala
```

To run the test suite, run the following command:

```
npm test
```

## Examples

### Decoding

```js
// the variable string being a valid scala scale format string

var ScalaScale = require('aural-scala'),
    scale = ScalaScale.parse(string);
```

### Encoding

```js
var ScalaScale = require('aural-scala'),
    scale = new ScalaScale();

scale.description = 'Short description of this custom scale';
scale.intervals.push(
    200,
    400,
    600,
    800,
    1000,
    1200
);

var string = scale.toString(); // returns a valid scala scale format string
```

## Public API

[Full API documentation](https://github.com/kchapelier/aural-scala/blob/master/API.md)

## Changelog

### 1.0.0 (2015.03.16) :

* The method parse is now static.
* The constructor doesn't accept a string to parse as argument anymore.
* Declare stable (freeze the public API).

[Full history](https://github.com/kchapelier/aural-scala/blob/master/CHANGELOG.md)

## Roadmap

* TBD

## License

MIT
