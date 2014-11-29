## app-log

Part of app helpers project.

Log all the stuff in json for slick analyzing and processing.

## Installation

```
npm install app-log
```

## Usage

```javascript
var log = require('app-log');

function createUser() {
	var user = { email: 'john@example.com', name: 'john' };
	log.info('New user created with email', user.email, user);
}

createUser();

// Concat all scalar values (strings, numbers) with spaces,
// and aggregate all objects to `data` property

// {
//   "functionName": "createUser",
//   "filePath": "/Users/boo1ean/src/app-log/stuff.js",
//   "lineNumber": 6,
//   "level": "info",
//   "time": "2014-11-29T14:01:23.253Z",
//   "message": "New user created with email john@example.com",
//   "data": {
//     "email": "john@example.com",
//     "name": "john"
//   }
// }
```

## Available log levels

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


/**
 * System is unusable.
 */
log.emergency('we all dead');
```

## Events

You can attach event handlers on log levels to do something critically useful:

```javascript
log.on('error', function notifyEveryone (message) {
	mailer.sendErrorToEveryone(message);
});
```

## Pretty printing json

By default log json object is pretty-printed. To disable pretty-printing and get single-line json objects:

```javascript
log.disablePrettyPrint();

// To enable back

log.enablePrettyPrint();
```

## Automatic catching and logging of uncaught exceptions

```javascript
log.catchUncaughtExceptions();

throw new Error('hey-hop!');

// {
//   "functionName": null,
//   "filePath": "/Users/boo1ean/src/app-log/index.js",
//   "lineNumber": 130,
//   "level": "alert",
//   "time": "2014-11-29T13:26:16.336Z",
//   "message": "Uncaught exception",
//   "data": {
//     "message": "Error: hey-hop!",
//     "stacktrace": [
//       "at Object.<anonymous> (/Users/boo1ean/src/app-log/stuff.js:15:7)",
//       "at Module._compile (module.js:456:26)",
//       "at Object.Module._extensions..js (module.js:474:10)",
//       "at Module.load (module.js:356:32)",
//       "at Function.Module._load (module.js:312:12)",
//       "at Function.Module.runMain (module.js:497:10)",
//       "at startup (node.js:119:16)",
//       "at node.js:901:3"
//     ]
//   }
// }
```

## Work with logs

After you have bunch of log json messages you can search through it using astonishing [json](https://github.com/trentm/json) cli util.

Here is some usefule examples:

```
# Find all warning-level messages
cat api.out.log | json -g | json -c 'this.level === "warning"'

# Get number of error-level log messages
cat api.out.log | json -g | json -c 'this.level === "error"' | json length
```

## License
MIT
