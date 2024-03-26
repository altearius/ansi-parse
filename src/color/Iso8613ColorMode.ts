// Justification: This file describes the values documented in ISO-8613.
/* eslint-disable @typescript-eslint/no-magic-numbers */

enum Iso8613ColorMode {
	/**
	 * implementation defined (only applicable for the character
	 * foreground colour)
	 */
	ImplementationDefined = 0,

	Transparent = 1,

	/**
	 * direct colour in RGB space
	 */
	Rgb = 2,

	/**
	 * direct colour in CMY space
	 */
	Cmy = 3,

	/**
	 * direct colour in CMYK space
	 */
	Cmyk = 4,

	Indexed = 5
}

export default Iso8613ColorMode;
