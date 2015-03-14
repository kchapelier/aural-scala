"use strict";

var ScalaFile = function (content) {
    this.description = '';
    this.intervals = [];

    if (content) {
        this.parse(content);
    }
};

/**
 * Description of the scala file
 * @type {String}
 */
ScalaFile.prototype.description = null;

/**
 * Array of intervals
 * @type {Array}
 */
ScalaFile.prototype.intervals = null;

/**
 * Parse a string in the scala format and populate the object
 * @param {String} contentFile - Content of the scala file
 * @private
 */
ScalaFile.prototype.parse = function (contentFile) {
    var lines = (contentFile + "\r\n").match(/^.*[\n\r]+|$/gm),
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
                    parsedInterval = this.treatInterval(interval);

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

ScalaFile.prototype.toString = function () {
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
        var intervalStr = this.intervals[i].toString();

        if (intervalStr.indexOf('.') === -1) {
            intervalStr += '.0';
        }

        string.push(intervalStr);
    }

    return string.join('\n');
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
