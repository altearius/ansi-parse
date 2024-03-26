import type AnsiEscapeCode from './AnsiEscapeCode.js';
import type { ParsedCode } from './AnsiEscapeCode.js';
import SgrCode, { isSgrCode } from './SgrCode.js';
import Iso8613ColorMode from './color/Iso8613ColorMode.js';
import type SgrColor from './color/SgrColor.js';

const codeDelimiter = /[;:]/gu;

export default function ParseAnsiEscapeCodeValues(
	raw: string | undefined
): AnsiEscapeCode {
	if (typeof raw !== 'string' || raw.length === 0) {
		return [{ code: SgrCode.Reset }];
	}

	const codes = raw.split(codeDelimiter).map((c) => Number(c.trim()));
	const result: ParsedCode[] = [];

	for (let cursor = 0; cursor < codes.length; cursor++) {
		const code = codes[cursor];

		if (
			code === SgrCode.ForegroundColour ||
			code === SgrCode.BackgroundColour
		) {
			const [color, consumed] = parseSgrColor(codes, cursor);
			result.push({ code, color });
			cursor += consumed;
			continue;
		}

		if (!isSgrCode(code)) {
			throw new Error('Invalid ANSI code: ' + (code?.toString() ?? '-'));
		}

		result.push({ code });
	}

	return result;
}

function parseSgrColor(
	codes: readonly number[],
	cursor: number
): readonly [SgrColor, number] {
	const mode = codes[cursor + 1];

	switch (mode) {
		case Iso8613ColorMode.Transparent:
		case Iso8613ColorMode.ImplementationDefined:
			return [{ mode }, 1];

		case Iso8613ColorMode.Indexed:
			return parseSgrIndexedColor(codes, cursor);

		case Iso8613ColorMode.Cmy:
		case Iso8613ColorMode.Rgb:
			return parseSgrDirectColor(mode, codes, cursor);

		case Iso8613ColorMode.Cmyk:
			return parseCmykDirectColor(codes, cursor);
		default:
			throw new Error('Invalid color mode: ' + (mode?.toString() ?? '-'));
	}
}

function isEightBit(n: number | undefined) {
	const max = 255;
	return n !== undefined && n >= 0 && n <= max;
}

function parseSgrIndexedColor(
	codes: readonly number[],
	cursor: number
): readonly [SgrColor, number] {
	const valueOffset = 2;
	const value = codes[cursor + valueOffset];

	if (typeof value !== 'number') {
		throw new Error('Missing indexed color value');
	}

	if (!isEightBit(value)) {
		throw new Error('Invalid indexed color value: ' + value.toString());
	}

	return [{ mode: Iso8613ColorMode.Indexed, value }, valueOffset - 1];
}

function parseSgrDirectColor(
	mode: Iso8613ColorMode.Cmy | Iso8613ColorMode.Rgb,
	codes: readonly number[],
	cursor: number
): readonly [SgrColor, number] {
	const startOffset = 2;
	const endOffset = 5;
	const [r, g, b] = codes.slice(cursor + startOffset, cursor + endOffset);

	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
		throw new Error('Missing color values');
	}

	if (!isEightBit(r) || !isEightBit(g) || !isEightBit(b)) {
		throw new Error('Invalid color values');
	}

	return [{ mode, values: [r, g, b] }, endOffset - 1];
}

function parseCmykDirectColor(
	codes: readonly number[],
	cursor: number
): readonly [SgrColor, number] {
	const startOffset = 2;
	const endOffset = 6;
	const [c, m, y, k] = codes.slice(cursor + startOffset, cursor + endOffset);

	if (
		typeof c !== 'number' ||
		typeof m !== 'number' ||
		typeof y !== 'number' ||
		typeof k !== 'number'
	) {
		throw new Error('Missing color values');
	}

	if (!isEightBit(c) || !isEightBit(m) || !isEightBit(y) || !isEightBit(k)) {
		throw new Error('Invalid color values');
	}

	return [{ mode: Iso8613ColorMode.Cmyk, values: [c, m, y, k] }, endOffset - 1];
}
