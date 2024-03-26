import type AnsiEscapeCode from './AnsiEscapeCode.js';
import type { ParsedCode } from './AnsiEscapeCode.js';
import type AnsiState from './AnsiState.js';
import SgrCode from './SgrCode.js';
import ResolveColor from './color/ResolveColor.js';

// Justification: I can think of ways to make this shorter, and I can think
// of ways to move the complexity around to pass lint, but I can't think of
// any way to hit those goals while maintaining or reducing readability.
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */

export default function ApplyCode(state: AnsiState, codes: AnsiEscapeCode) {
	for (const code of codes) {
		applySingleCode(state, code);
	}
}

function applySingleCode(state: AnsiState, single: ParsedCode) {
	switch (single.code) {
		case SgrCode.Reset:
			state.reset();
			break;

		case SgrCode.Bold:
			state.intensity = 'bold';
			break;

		case SgrCode.Faint:
			state.intensity = 'faint';
			break;

		case SgrCode.Italic:
			state.italic = true;
			break;

		case SgrCode.Underline:
			state.underline = 'single';
			break;

		case SgrCode.SlowBlink:
			state.blink = 'slow';
			break;

		case SgrCode.FastBlink:
			state.blink = 'fast';
			break;

		case SgrCode.Inverse:
			state.inverted = true;
			break;

		case SgrCode.Conceal:
			state.concealed = true;
			break;

		case SgrCode.CrossedOut:
			state.crossedOut = true;
			break;

		case SgrCode.PrimaryFont:
			state.font = 'primary';
			break;

		case SgrCode.FirstAlternativeFont:
			state.font = 1;
			break;

		case SgrCode.SecondAlternativeFont:
			state.font = 2;
			break;

		case SgrCode.ThirdAlternativeFont:
			state.font = 3;
			break;

		case SgrCode.FourthAlternativeFont:
			state.font = 4;
			break;

		case SgrCode.FifthAlternativeFont:
			state.font = 5;
			break;

		case SgrCode.SixthAlternativeFont:
			state.font = 6;
			break;

		case SgrCode.SeventhAlternativeFont:
			state.font = 7;
			break;

		case SgrCode.EighthAlternativeFont:
			state.font = 8;
			break;

		case SgrCode.NinthAlternativeFont:
			state.font = 9;
			break;

		case SgrCode.Fraktur:
			state.font = 'fraktur';
			break;

		case SgrCode.DoublyUnderlined:
			state.underline = 'double';
			break;

		case SgrCode.NormalIntensity:
			state.intensity = 'normal';
			break;

		case SgrCode.NotItalicized:
			state.italic = false;
			break;

		case SgrCode.NotUnderlined:
			state.underline = 'none';
			break;

		case SgrCode.Steady:
			state.blink = 'none';
			break;

		case SgrCode.ProportionalSpacing:
			state.proportional = true;
			break;

		case SgrCode.PositiveImage:
			state.inverted = false;
			break;

		case SgrCode.Reveal:
			state.concealed = false;
			break;

		case SgrCode.NotCrossedOut:
			state.crossedOut = false;
			break;

		case SgrCode.BlackDisplay:
			state.foreground = 'black';
			break;

		case SgrCode.RedDisplay:
			state.foreground = 'red';
			break;

		case SgrCode.GreenDisplay:
			state.foreground = 'green';
			break;

		case SgrCode.YellowDisplay:
			state.foreground = 'yellow';
			break;

		case SgrCode.BlueDisplay:
			state.foreground = 'blue';
			break;

		case SgrCode.MagentaDisplay:
			state.foreground = 'magenta';
			break;

		case SgrCode.CyanDisplay:
			state.foreground = 'cyan';
			break;

		case SgrCode.WhiteDisplay:
			state.foreground = 'white';
			break;

		case SgrCode.ForegroundColour:
			if ('color' in single) {
				state.foreground = ResolveColor(single.color);
			}

			break;

		case SgrCode.DefaultDisplayColour:
			state.foreground = 'default';
			break;

		case SgrCode.BlackBackground:
			state.background = 'black';
			break;

		case SgrCode.RedBackground:
			state.background = 'red';
			break;

		case SgrCode.GreenBackground:
			state.background = 'green';
			break;

		case SgrCode.YellowBackground:
			state.background = 'yellow';
			break;

		case SgrCode.BlueBackground:
			state.background = 'blue';
			break;

		case SgrCode.MagentaBackground:
			state.background = 'magenta';
			break;

		case SgrCode.CyanBackground:
			state.background = 'cyan';
			break;

		case SgrCode.WhiteBackground:
			state.background = 'white';
			break;

		case SgrCode.BackgroundColour:
			if ('color' in single) {
				state.background = ResolveColor(single.color);
			}

			break;

		case SgrCode.DefaultBackgroundColour:
			state.background = 'default';
			break;

		case SgrCode.CancelProportionalSpacing:
			state.proportional = false;
			break;

		case SgrCode.Framed:
			state.framed = true;
			break;

		case SgrCode.Encircled:
			state.circled = true;
			break;

		case SgrCode.Overlined:
			state.overlined = true;
			break;

		case SgrCode.NotFramed:
			state.framed = false;
			break;

		case SgrCode.NotOverlined:
			state.overlined = false;
			break;
	}
}
