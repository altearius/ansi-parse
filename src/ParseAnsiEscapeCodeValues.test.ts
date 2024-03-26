import * as assert from 'node:assert';
import { describe, it } from 'node:test';
import ParseAnsiEscapeCodeValues from './ParseAnsiEscapeCodeValues.js';
import SgrCode from './SgrCode.js';
import Iso8613ColorMode from './color/Iso8613ColorMode.js';

describe('ParseAnsiEscapeCodeValues', () => {
	it('should parse ANSI codes', () => {
		const r1 = 255;
		const g1 = 82;
		const b1 = 197;

		const r2 = 155;
		const g2 = 106;
		const b2 = 0;

		const raw = `38;2;${r1};${g1};${b1};48;2;${r2};${g2};${b2}`;
		const result = ParseAnsiEscapeCodeValues(raw);

		assert.deepStrictEqual(result, [
			{
				code: SgrCode.ForegroundColour,
				color: {
					mode: Iso8613ColorMode.Rgb,
					values: [r1, g1, b1]
				}
			},

			{
				code: SgrCode.BackgroundColour,
				color: {
					mode: Iso8613ColorMode.Rgb,
					values: [r2, g2, b2]
				}
			}
		]);
	});
});
