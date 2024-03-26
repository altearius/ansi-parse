// Justification: This file defines constants according to the indicated specs.
/* eslint-disable @typescript-eslint/no-magic-numbers */

// Values 0 - 65, excluding 38 and 48 are from the ECMA-48 standard:
// https://ecma-international.org/wp-content/uploads/ECMA-48_5th_edition_june_1991.pdf
// Section 8.3.117

// Values 38, 48, 90-97, and 100-107 are from the xterm-256color standard:
// From https://invisible-island.net/xterm/ctlseqs/ctlseqs.html

/**
 * Select Graphics Rendition (SGR) codes.
 */
enum SgrCode {
	/**
	 * default rendition (implementation-defined), cancels the effect of any
	 * preceding occurrence of SGR in the data stream regardless of the setting
	 * of the GRAPHIC RENDITION COMBINATION MODE (GRCM)
	 */
	Reset = 0,

	/**
	 * bold or increased intensity
	 */
	Bold = 1,

	/**
	 * faint, decreased intensity or second colour
	 */
	Faint = 2,

	/**
	 * italicized
	 */
	Italic = 3,

	/**
	 * singly underlined
	 */
	Underline = 4,

	/**
	 * slowly blinking (less then 150 per minute)
	 */
	SlowBlink = 5,

	/**
	 * rapidly blinking (150 per minute or more)
	 */
	FastBlink = 6,

	/**
	 * negative image
	 */
	Inverse = 7,

	/**
	 * concealed characters
	 */
	Conceal = 8,

	/**
	 * crossed-out (characters still legible but marked as to be deleted)
	 */
	CrossedOut = 9,

	/**
	 * primary (default) font
	 */
	PrimaryFont = 10,

	/**
	 * first alternative font
	 */
	FirstAlternativeFont = 11,

	/**
	 * second alternative font
	 */
	SecondAlternativeFont = 12,

	/**
	 * third alternative font
	 */
	ThirdAlternativeFont = 13,

	/**
	 * fourth alternative font
	 */
	FourthAlternativeFont = 14,

	/**
	 * fifth alternative font
	 */
	FifthAlternativeFont = 15,

	/**
	 * sixth alternative font
	 */
	SixthAlternativeFont = 16,

	/**
	 * seventh alternative font
	 */
	SeventhAlternativeFont = 17,

	/**
	 * eighth alternative font
	 */
	EighthAlternativeFont = 18,

	/**
	 * ninth alternative font
	 */
	NinthAlternativeFont = 19,

	/**
	 * Fraktur (Gothic)
	 */
	Fraktur = 20,

	/**
	 * doubly underlined
	 */
	DoublyUnderlined = 21,

	/**
	 * normal colour or normal intensity (neither bold nor faint)
	 */
	NormalIntensity = 22,

	/**
	 * not italicized, not fraktur
	 */
	NotItalicized = 23,

	/**
	 * not underlined (neither singly nor doubly)
	 */
	NotUnderlined = 24,

	/**
	 * steady (not blinking)
	 */
	Steady = 25,

	/**
	 * (reserved for proportional spacing as specified in CCITT
	 * Recommendation T.61)
	 */
	ProportionalSpacing = 26,

	/**
	 * positive image
	 */
	PositiveImage = 27,

	/**
	 * revealed characters
	 */
	Reveal = 28,

	/**
	 * not crossed out
	 */
	NotCrossedOut = 29,

	/**
	 * black display
	 */
	BlackDisplay = 30,

	/**
	 * red display
	 */
	RedDisplay = 31,

	/**
	 * green display
	 */
	GreenDisplay = 32,

	/**
	 * yellow display
	 */
	YellowDisplay = 33,

	/**
	 * blue display
	 */
	BlueDisplay = 34,

	/**
	 * magenta display
	 */
	MagentaDisplay = 35,

	/**
	 * cyan display
	 */
	CyanDisplay = 36,

	/**
	 * white display
	 */
	WhiteDisplay = 37,

	/**
	 * (reserved for future standardization; intended for setting character
	 * foreground colour as specified in ISO 8613-6 [CCITT Recommendation T.416])
	 */
	ForegroundColour = 38,

	/**
	 * default display colour (implementation-defined)
	 */
	DefaultDisplayColour = 39,

	/**
	 * black background
	 */
	BlackBackground = 40,

	/**
	 * red background
	 */
	RedBackground = 41,

	/**
	 * green background
	 */
	GreenBackground = 42,

	/**
	 * yellow background
	 */
	YellowBackground = 43,

	/**
	 * blue background
	 */
	BlueBackground = 44,

	/**
	 * magenta background
	 */
	MagentaBackground = 45,

	/**
	 * cyan background
	 */
	CyanBackground = 46,

	/**
	 * white background
	 */
	WhiteBackground = 47,

	/**
	 * (reserved for future standardization; intended for setting character
	 * background colour as specified in ISO 8613-6 [CCITT Recommendation T.416])
	 */
	BackgroundColour = 48,

	/**
	 * default background colour (implementation-defined)
	 */
	DefaultBackgroundColour = 49,

	/**
	 * (reserved for cancelling the effect of the rendering aspect established
	 * by parameter value 26)
	 */
	CancelProportionalSpacing = 50,

	/**
	 * framed
	 */
	Framed = 51,

	/**
	 * encircled
	 */
	Encircled = 52,

	/**
	 * overlined
	 */
	Overlined = 53,

	/**
	 * not framed, not encircled
	 */
	NotFramed = 54,

	/**
	 * not overlined
	 */
	NotOverlined = 55,

	/**
	 * (reserved for future standardization)
	 */
	Reserved56 = 56,

	/**
	 * (reserved for future standardization)
	 */
	Reserved57 = 57,

	/**
	 * (reserved for future standardization)
	 */
	Reserved58 = 58,

	/**
	 * (reserved for future standardization)
	 */
	Reserved59 = 59,

	/**
	 * ideogram underline or right side line
	 */
	IdeogramUnderline = 60,

	/**
	 * ideogram double underline or double line on the right side
	 */
	IdeogramDoubleUnderline = 61,

	/**
	 * ideogram overline or left side line
	 */
	IdeogramOverline = 62,

	/**
	 * ideogram double overline or double line on the left side
	 */
	IdeogramDoubleOverline = 63,

	/**
	 * ideogram stress marking
	 */
	IdeogramStressMarking = 64,

	/**
	 * cancels the effect of the rendition aspects established by parameter
	 * values 60 to 64
	 */
	CancelIdeogramStressMarking = 65
}

export default SgrCode;

export function isSgrCode(code: number | undefined): code is SgrCode {
	return code !== undefined && code in SgrCode;
}
