var ScalaScale = require('./../'),
    should = require('chai').should();

describe('Encoding the Scala scale format', function () {
    describe('Encoding a normal scale', function () {
        var scala = new ScalaScale(),
            parsedScala = new ScalaScale();

        scala.description = 'Encoding test';
        scala.intervals.push(50, 100, 200, 400, 800, 1200);

        it('should return a string', function () {
            scala.toString().should.be.a('string');
        });

        it('should be parseable to an identical object', function () {
            parsedScala.parse(scala.toString());

            parsedScala.should.deep.equal(scala);
        });
    });

    describe('Encoding an empty scale', function () {
        var scala = new ScalaScale(),
            parsedScala = new ScalaScale();

        it('should return a string', function () {
            scala.toString().should.be.a('string');
        });

        it('should be parseable to an identical object', function () {
            parsedScala.parse(scala.toString());

            parsedScala.should.deep.equal(scala);
        });
    });
});
