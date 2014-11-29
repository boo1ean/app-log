require('should');
var log = require('./');

describe('Logger', function () {
	it('all log levels should exist', function () {
		log.debug.should.be.type('function');
		log.info.should.be.type('function');
		log.notice.should.be.type('function');
		log.warning.should.be.type('function');
		log.error.should.be.type('function');
		log.alert.should.be.type('function');
		log.critical.should.be.type('function');
		log.emergency.should.be.type('function');
	});

	it('should be event emitter', function (done) {
		log.on('custom-event', done);
		log.emit('custom-event');
	});

	it('events should trigger properly', function (done) {
		log.on('info', function () {
			done();
		});

		log.info('hello');
	});

	it('format should be ok', function (done) {
		log.on('warning', function (message) {
			var obj = JSON.parse(message);

			obj["filePath"].should.be.ok;
			obj["lineNumber"].should.be.ok;
			obj["level"].should.be.ok;
			obj["time"].should.be.ok;
			obj["message"].should.be.ok;
			obj["data"].a.should.be.ok;

			done();
		});

		log.warning('test', { a: 1 });
	});
});
