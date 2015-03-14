"use strict";

var util = require('./lib/util');

var ScalaScale = function (content) {
    this.description = '';
    this.intervals = [];

    if (content) {
        this.parse(content);
    }
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
 * Parse a string in the Scala format and populate the object
 * @param {String} contentFile Content of the Scala file
 * @private
 */
ScalaScale.prototype.parse = function (contentFile) {
    var lines = (contentFile + '\r\n').match(/^.*[\n\r]{1,2}|$/gm),
        countLines = 0,
        line,
        numberIntervals,
        interval,
        parsedInterval,
        i;

    this.intervals = [];

    for (i = 0; i < lines.length; i++) {
        line = lines[i];

        if (line.indexOf('!') !== 0) { //exclude comment lines
            if (countLines === 0) {
                //first non-commented line is description
                this.description = line.trim();
            } else if (countLines === 1) {
                //second non-commented line is the number of intervals
                numberIntervals = parseInt(line, 10);
            } else {
                //every other non-commented lines are interval values
                interval = line.trim();

                if (interval !== '') {
                    parsedInterval = util.intervalFromString(interval);

                    if (isFinite(parsedInterval)) {
                        this.intervals.push(parsedInterval);
                    }
                }
            }

            countLines++;
        }
    }

    if (this.intervals.length !== numberIntervals) {
        throw 'Error in file format : incorrect number of valid intervals';
    }
};

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

module.exports = ScalaScale;
