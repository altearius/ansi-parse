import * as assert from 'node:assert';
import { describe, it } from 'node:test';
import AnsiState from './AnsiState.js';
import Parse from './Parse.js';

describe('Parse', () => {
	it('should group parts of a text string by their ansi state', () => {
		// Arrange
		const r1 = 255;
		const g1 = 82;
		const b1 = 197;

		const r2 = 155;
		const g2 = 106;
		const b2 = 0;

		const ansi = `Ansi colors: \x1b[1;33;40mcolor 1 \x1b[1;33;41m color 2\x1b[38;2;${r1};${g1};${b1};48;2;${r2};${g2};${b2}m Lots of colors!\x1b[m Reset code sent.`;

		// Act
		const content = [];
		const gen = Parse(ansi, new AnsiState());

		let result = gen.next();

		while (!result.done) {
			content.push(result.value);
			result = gen.next();
		}

		// Assert
		assert.deepStrictEqual(result.value, new AnsiState());

		const color1State = new AnsiState();
		color1State.intensity = 'bold';
		color1State.foreground = 'yellow';
		color1State.background = 'black';

		const color2State = new AnsiState();
		color2State.intensity = 'bold';
		color2State.foreground = 'yellow';
		color2State.background = 'red';

		const lotsOfColorsState = new AnsiState();
		lotsOfColorsState.intensity = 'bold';
		lotsOfColorsState.foreground = [r1, g1, b1];
		lotsOfColorsState.background = [r2, g2, b2];

		assert.deepStrictEqual(content, [
			{ state: new AnsiState(), value: 'Ansi colors: ' },
			{ state: color1State, value: 'color 1 ' },
			{ state: color2State, value: ' color 2' },
			{
				state: lotsOfColorsState,
				value: ' Lots of colors!'
			},
			{
				state: new AnsiState(),
				value: ' Reset code sent.'
			}
		]);
	});
});
