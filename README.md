## app-controller

Part of app helpers project.

Log all the stuff in json.

## Installation

```
npm install app-log
```

## Usage

There are a bunch of log levels for different cases:

```javascript
var log = require('app-log');

/**
 * Detailed debug information.
 */
log.debug('Transaction completed', transaction),

/**
 * Interesting events.
 *
 * Example: User logs in, SQL logs.
 */
log.info('User registered', user);

/**
 * Normal but significant events.
 */
log.notice('Whatever..');

/**
 * Exceptional occurrences that are not errors.
 *
 * Example: Use of deprecated APIs, poor use of an API, undesirable things
 * that are not necessarily wrong.
 */
log.warning('User permissions denied', context);

/**
 * Runtime errors that do not require immediate action but should typically
 * be logged and monitored.
 */
log.error('Unavailable product type requested');

/**
 * Critical conditions.
 *
 * Example: Application component unavailable, unexpected exception.
 */
alert.critical('NO!!');

/**
 * Action must be taken immediately.
 *
 * Example: Entire website down, database unavailable, etc. This should
 * trigger the SMS alerts and wake you up.
 */
log.alert('FIRE!!!');
```

## Events

You can attach event handlers on log levels to do something critically useful:

```javascript
log.on('error', function notifyEveryone (message) {
	mailer.sendErrorToEveryone(message);
});
```

## License
MIT
