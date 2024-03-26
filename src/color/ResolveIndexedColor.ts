import type AnsiColor from './AnsiColor.js';

// Justification: Magic numbers in this file are documented with
// inline comments.
/* eslint-disable @typescript-eslint/no-magic-numbers */

// Derived from https://stackoverflow.com/questions/27159322
export default function ResolveIndexedColor(value: number): AnsiColor {
	// Color numbers 0 to 7 are the default terminal colors, the actual RGB value
	// of which is not standardized and can often be configured.
	const colors = [
		'black',
		'red',
		'green',
		'yellow',
		'blue',
		'magenta',
		'cyan',
		'white'
	] as const;

	const terminalColor = colors[value];
	if (terminalColor) {
		return terminalColor;
	}

	// Color numbers 8 to 15 are the "bright" colors. Most of the time these are
	// a lighter shade of the color with index - 8. They are also not
	// standardized and can often be configured. Depending on terminal and shell,
	// they are often used instead of or in conjunction with bold font faces.
	const brightColor = colors[value - 8];
	if (brightColor) {
		return ('bright ' + brightColor) as AnsiColor;
	}

	// Color numbers 16 to 231 are RGB colors. These 216 colors are defined by 6
	// values on each of the three RGB axes. That is, instead of values 0 - 255,
	// each color only ranges from 0 - 5.
	if (value <= 231) {
		const r = Math.floor((value - 16) / 36);
		const g = Math.floor(((value - 16) % 36) / 6);
		const b = (value - 16) % 6;
		return [r * 51, g * 51, b * 51] as const;
	}

	// The color numbers 232 to 255 are grayscale with 24 shades of gray from
	// dark to light.
	if (value <= 255) {
		const shade = Math.floor((value - 232) * 10.75);
		return [shade, shade, shade] as const;
	}

	throw new Error('Could not resolved indexed color: ' + value.toString());
}
