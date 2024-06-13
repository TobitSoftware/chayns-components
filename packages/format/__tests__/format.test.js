'use strict';

const format = require('..');
const assert = require('assert').strict;

assert.strictEqual(format(), 'Hello from format');
console.info('format tests passed');
