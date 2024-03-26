import AnsiState from './AnsiState.js';
import ApplyCode from './ApplyCode.js';
import ParseCodes from './ParseCodes.js';

export default function* Parse(
	ansi: string,
	initial?: AnsiState
) {
	const currentState = new AnsiState(initial);

	for (const token of ParseCodes(ansi)) {
		if (typeof token === 'string') {
			yield {
				state: new AnsiState(currentState),
				value: token
			};

			continue;
		}

		ApplyCode(currentState, token);
	}

	return currentState;
}
