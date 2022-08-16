// eslint-disable-next-line func-style
function equal(actual, expected, message) {
	if (actual === expected) {
		const defaultMessage = `Expected ${expected} and received ${actual}`;
		console.info(`Pass: ${message || defaultMessage}`);
	} else {
		const defaultMessage = `Expected ${expected} but received ${actual} instead`;
		console.error(`Fail: ${message || defaultMessage}`);
	}
}

// eslint-disable-next-line func-style
function notEqual(actual, expected, message) {
	if (actual !== expected) {
		const defaultMessage = `${expected} is different to ${actual}`;
		console.info(`Pass: ${message || defaultMessage}`);
	} else {
		const defaultMessage = `${expected} is the same as ${actual}`;
		console.error(`Fail: ${message || defaultMessage}`);
	}
}

// eslint-disable-next-line func-style
function test(name, testFunction) {
	console.group(name);
	testFunction();
	console.groupEnd(name);
}
