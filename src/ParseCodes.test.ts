import * as assert from 'node:assert';
import { describe, it } from 'node:test';
import ParseCodes from './ParseCodes.js';

describe('ParseCodes', () => {
	it('should parse ANSI codes', () => {
		const red = 31;
		const green = 32;
		const redCode = `\x1b[${red.toString()}m`;
		const greenCode = `\x1b[${green.toString()}m`;
		const resetCode = '\x1b[0m';
		const raw = `${redCode}Hello, ${greenCode}world${resetCode}!`;
		const result = [...ParseCodes(raw)];

		assert.deepStrictEqual(result, [
			[{ code: red }],
			'Hello, ',
			[{ code: green }],
			'world',
			[{ code: 0 }],
			'!'
		]);
	});
});
