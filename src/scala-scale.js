"use strict";

var util = require('./lib/util');

var ScalaScale = function () {
    this.description = '';
    this.intervals = [];
};

/**
 * Description of the Scala file
 * @type {String}
 */
ScalaScale.prototype.description = null;

/**
 * Array of intervals
 * @type {Array}
 */
ScalaScale.prototype.intervals = null;

/**
 * Encode the scale as a valid Scala string
 * @returns {String} Scale in Scala scale format
 */
ScalaScale.prototype.toString = function () {
    var string = [],
        i;

    string.push(
        '! generated with aural-scala',
        '!',
        this.description,
        this.intervals.length,
        '!'
    );

    for (i = 0; i < this.intervals.length; i++) {
        string.push(util.intervalToString(this.intervals[i]));
    }

    return string.join('\r\n');
};

/**
 * Parse a string in the Scala format and return a instance of the Scala scale
 * @param {String} string Content of the Scala file
 * @returns {ScalaScale} Scala scale instance
 */
ScalaScale.parse = function (string) {
    var scale = new ScalaScale(),
        lines = (string + '\r\n').match(/^.*[\n\r]{1,2}|$/gm),
        countLines = 0,
        line,
        numberIntervals,
        interval,
        parsedInterval,
        i;

    for (i = 0; i < lines.length; i++) {
        line = lines[i];

        if (line.indexOf('!') !== 0) { //exclude comment lines
            if (countLines === 0) {
                //first non-commented line is description
                scale.description = line.trim();
            } else if (countLines === 1) {
                //second non-commented line is the number of intervals
                numberIntervals = parseInt(line, 10);
            } else {
                //every other non-commented lines are interval values
                interval = line.trim();

                if (interval !== '') {
                    parsedInterval = util.intervalFromString(interval);

                    if (isFinite(parsedInterval)) {
                        scale.intervals.push(parsedInterval);
                    }
                }
            }

            countLines++;
        }
    }

    if (scale.intervals.length !== numberIntervals) {
        throw 'Error in file format : incorrect number of valid intervals';
    }

    return scale;
};

module.exports = ScalaScale;
