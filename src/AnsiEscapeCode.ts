import type SgrCode from './SgrCode.js';
import type SgrColor from './color/SgrColor.js';

export type ParsedCode =
	| {
			readonly code: Omit<SgrCode, 'BackgroundColour' | 'ForegroundColour'>;
	  }
	| {
			readonly code: SgrCode.BackgroundColour | SgrCode.ForegroundColour;
			readonly color: SgrColor;
	  };

type AnsiEscapeCode = readonly ParsedCode[];
export default AnsiEscapeCode;
