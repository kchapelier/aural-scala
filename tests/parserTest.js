var ScalaFile = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

describe('Parsing the Scala scale format', function () {
    describe('Parsing the most simple valid "scale"', function () {
        var data = fs.readFileSync('./tests/resources/empty.scl', 'utf-8'),
            scala = new ScalaFile(data);

        it('should report the expected properties', function () {
            scala.description.should.equal('');
        });

        it('should contain all the expected intervals (none)', function () {
            scala.intervals.length.should.equal(0);
        });
    });

    describe('Parsing the 1/4-comma meantone scale', function () {
        var data = fs.readFileSync('./tests/resources/meanquar.scl', 'utf-8'),
            expectedIntervals = [
                76.049,
                193.15686,
                310.26471,
                386.3137138648348,
                503.42157,
                579.47057,
                696.57843,
                772.6274277296696,
                889.73529,
                1006.84314,
                1082.89214,
                1200
            ],
            scala = new ScalaFile(data);

        it('should report the expected properties', function () {
            scala.description.should.equal('1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)');
        });

        it('should contain all the expected intervals', function () {
            scala.intervals.length.should.equal(12);

            for (var i = 0; i < expectedIntervals.length; i++) {
                expectedIntervals[i].should.equal(scala.intervals[i]);
            }
        });
    });

    describe('Parsing the 12-tone Pythagorean scale', function () {
        var data = fs.readFileSync('./tests/resources/pyth_12.scl', 'utf-8'),
            expectedIntervals = [
                113.68500605771193,
                203.91000173077487,
                294.13499740383764,
                407.82000346154973,
                498.04499913461245,
                611.7300051923245,
                701.9550008653874,
                815.6400069230995,
                905.8650025961624,
                996.0899982692251,
                1109.775004326937,
                1200
            ],
            scala = new ScalaFile(data);

        it('should report the expected properties', function () {
            scala.description.should.equal('12-tone Pythagorean scale');
        });

        it('should contain all the expected intervals', function () {
            scala.intervals.length.should.equal(12);

            for (var i = 0; i < expectedIntervals.length; i++) {
                expectedIntervals[i].should.equal(scala.intervals[i]);
            }
        });
    });

    describe('Parsing the Siamese Tuning', function () {
        var data = fs.readFileSync('./tests/resources/siamese.scl', 'utf-8'),
            expectedIntervals = [
                49.8,
                172,
                215,
                344,
                515,
                564.8,
                685.8,
                735.8,
                857.8,
                914.8,
                1028.8,
                1200
            ],
            scala = new ScalaFile(data);

        it('should report the expected properties', function () {
            scala.description.should.equal('Siamese Tuning, after Clem Fortuna\'s Microtonal Guide');
        });

        it('should contain all the expected intervals', function () {
            scala.intervals.length.should.equal(12);

            for (var i = 0; i < expectedIntervals.length; i++) {
                expectedIntervals[i].should.equal(scala.intervals[i]);
            }
        });
    });
});
