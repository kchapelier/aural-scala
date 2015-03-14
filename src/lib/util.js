"use strict";

/**
 * Parse a Scala interval value and return it as cents
 * @param {String} string Interval in any of the valid interval Scala format
 * @returns {Number} Interval in cents
 */
var intervalFromString = function (string) {
    var isCent = false,
        interval,
        division;

    string = string.split(' ')[0];

    if (string.indexOf('/') > 0) {
        //ratio notation
        division = string.split('/');
        interval = parseFloat(division[0]) / parseFloat(division[1]);
    } else {
        //cent or integer ratio notation
        interval = parseFloat(string);
        isCent = (string.indexOf('.') > 0);
    }

    if (!isCent) {
        if (interval < 0) {
            throw 'Error in file format : negative ratio as interval';
        }

        interval = 1200 * Math.log(interval) / Math.log(2);
    }

    return interval;
};

/**
 * Convert a float cent value to a valid Scala string representation
 * @param {Number} interval Interval in cents
 * @returns {String} Valid Scala string representation
 */
var intervalToString = function intervalToString (interval) {
    var string = interval.toString();

    if (string.indexOf('.') === -1) {
        string += '.0';
    }

    return string;
};


var util = {
    intervalToString: intervalToString,
    intervalFromString: intervalFromString
};


module.exports = util;
