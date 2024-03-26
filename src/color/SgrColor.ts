import type Iso8613ColorMode from './Iso8613ColorMode.js';

type SgrColor =
	| {
			readonly mode:
				| Iso8613ColorMode.ImplementationDefined
				| Iso8613ColorMode.Transparent;
	  }
	| {
			readonly mode: Iso8613ColorMode.Cmy;
			readonly values: readonly [number, number, number];
	  }
	| {
			readonly mode: Iso8613ColorMode.Cmyk;
			readonly values: readonly [number, number, number, number];
	  }
	| {
			readonly mode: Iso8613ColorMode.Indexed;
			readonly value: number;
	  }
	| {
			readonly mode: Iso8613ColorMode.Rgb;
			readonly values: readonly [number, number, number];
	  };

export default SgrColor;
