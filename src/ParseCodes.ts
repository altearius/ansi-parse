import type AnsiEscapeCode from './AnsiEscapeCode.js';
import ParseAnsiEscapeCodeValues from './ParseAnsiEscapeCodeValues.js';

export default function* ParseCodes(raw: string) {
	// Justification: \x1b is the control character used to start an ANSI
	// escape sequence.
	// eslint-disable-next-line no-control-regex
	const re = /\x1b\[(?<code>[0-9;:]*?)m/gu;

	let lastCode: AnsiEscapeCode | undefined;
	let match: RegExpExecArray | null;
	let cursor = 0;

	while ((match = re.exec(raw))) {
		const sinceLastMatch = raw.slice(cursor, match.index);
		if (sinceLastMatch) {
			if (lastCode && lastCode.length > 0) {
				yield lastCode;
			}

			lastCode = undefined;
			yield sinceLastMatch;
		}

		const [value] = match;
		cursor = match.index + value.length;
		lastCode = [
			...(lastCode ?? []),
			...ParseAnsiEscapeCodeValues(match.groups?.code)
		];
	}

	const remaining = raw.slice(cursor);
	if (remaining) {
		if (lastCode && lastCode.length > 0) {
			yield lastCode;
		}

		yield remaining;
	}
}
