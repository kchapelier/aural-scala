"use strict";

var ScalaFile = function () {
    this.description = '';
    this.numberIntervals = 0;
    this.intervals = [];
};

/**
 * Description of the scala file
 * @type {String}
 */
ScalaFile.prototype.description = null;

/**
 * Number of intervals as defined in the file
 * @type {Number}
 */
ScalaFile.prototype.numberIntervals = null;

/**
 * Array of intervals
 * @type {Array}
 */
ScalaFile.prototype.intervals = null;

/**
 * Parse the content of a scala file and populate the object
 * @param {String} contentFile - Content of the scala file
 * @private
 */
ScalaFile.prototype.parse = function (contentFile) {
    var lines = (contentFile + "\r\n").match(/^.*[\n\r]+|$/gm),
        countLines = 0,
        line,
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
                this.numberIntervals = parseInt(line, 10);
            } else {
                //every other non-commented lines are interval values
                interval = line.trim();

                if (interval !== '') {
                    parsedInterval = this.treatInterval(interval);

                    if (!isNaN(parsedInterval)) {
                        this.intervals.push(parsedInterval);
                    }
                }
            }

            countLines++;
        }
    }

    if (this.intervals.length !== this.numberIntervals) {
        throw 'Error in file format : incorrect number of valid intervals';
    }
};

/**
 * Parse a scala interval value and return it as cents
 * @param {String} interval - Interval in any of the valid interval scala format
 * @returns {Number} Interval in cents
 * @private
 */
ScalaFile.prototype.treatInterval = function (interval) {
    var isCent = false,
        convertedInterval,
        division;

    interval = interval.split(' ')[0];

    if (interval.indexOf('/') > 0) {
        //ratio notation
        division = interval.split('/');
        convertedInterval = parseFloat(division[0]) / parseFloat(division[1]);
    } else {
        if (interval.indexOf('.') > 0) {
            //cent notation
            convertedInterval = parseFloat(interval);
            isCent = true;
        } else {
            //integer ratio notation
            convertedInterval = parseFloat(interval);
        }
    }

    if (!isCent) {
        if (convertedInterval < 0) {
            throw 'Error in file format : negative ratio as interval';
        }

        convertedInterval = 1200 * Math.log(convertedInterval) / Math.log(2);
    }

    return convertedInterval;
};

module.exports = ScalaFile;
