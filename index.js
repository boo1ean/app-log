var _ = require('lodash');
var callerId = require('caller-id');
var EventEmitter = require('events').EventEmitter;

var log = {
	/**
	 * System is unusable.
	 */
	emergency: notify('emergency'),
	
	/**
	 * Action must be taken immediately.
	 *
	 * Example: Entire website down, database unavailable, etc. This should
	 * trigger the SMS alerts and wake you up.
	 */
	alert: notify('alert'),
	
	/**
	 * Critical conditions.
	 *
	 * Example: Application component unavailable, unexpected exception.
	 */
	critical: notify('critical'),
	
	/**
	 * Runtime errors that do not require immediate action but should typically
	 * be logged and monitored.
	 */
	error: notify('error'),
	
	/**
	 * Exceptional occurrences that are not errors.
	 *
	 * Example: Use of deprecated APIs, poor use of an API, undesirable things
	 * that are not necessarily wrong.
	 */
	warning: notify('warning'),
	
	/**
	 * Normal but significant events.
	 */
	notice: notify('notice'),
	
	/**
	 * Interesting events.
	 *
	 * Example: User logs in, SQL logs.
	 */
	info: notify('info'),
	
	/**
	 * Detailed debug information.
	 */
	debug: notify('debug'),

	prettyPrint: true,

	catchUncaughtExceptions: catchUncaughtExceptions,
	enablePrettyPrint: enablePrettyPrint,
	disablePrettyPrint: disablePrettyPrint
};

log.__proto__ = new EventEmitter();

function notify (level) {
	return function writeInfoLog () {
		var callerData = callerId.getData();
		
		callerData = callerData
			? _.pick(callerData, ['functionName', 'filePath', 'lineNumber'])
			: { noCallerData: true };

		var args = Array.prototype.slice.apply(arguments);
		var message = getMessage(args, callerData, level);

		log.emit(level, message);

		return console.log(message);
	};

	function getMessage (args, callerData, level) {
		var data = _.extend(callerData, {
			level: level,
			time: currentTime(),
			message: getTextMessage(args),
			data: getMessageData(args)
		});

		if (log.prettyPrint) {
			return JSON.stringify(data, null, 2);
		}

		return JSON.stringify(data);

		function currentTime () {
			return new Date();
		}

		function getTextMessage (args) {
			return _.reject(args, _.isObject).join(' ');
		}

		function getMessageData (args) {
			args = _.filter(args, _.isObject);

			if (args.length === 1) {
				return args[0];
			}

			return args;
		}
	}

}

function catchUncaughtExceptions () {
	process.on('uncaughtException', function (exception) {
		var data = exception;

		// Check if error was properly thrown
		if (exception.stack) {
			var stack = exception.stack.split('\n');

			// First line of stack is error type + error message
			var message = stack[0];

			// Actual stacktrace
			stack = stack.slice(1).map(trimString);
			
			// Data payload for log
			var data = {
				message: message,
				stacktrace: stack
			};
		}

		log.alert('Uncaught exception', data);
	});

	function trimString (string) {
		return string.trim();
	}
}

function enablePrettyPrint () {
	log.prettyPrint = true;
}

function disablePrettyPrint () {
	log.prettyPrint = false;
}

module.exports = log;
