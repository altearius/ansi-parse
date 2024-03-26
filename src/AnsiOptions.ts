export default interface AnsiOptions {
	readonly alternateFonts?: readonly [
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined
	];
	readonly frakturFontFamily?: string;
	readonly slowBlinkAnimation?: string;
	readonly fastBlinkAnimation?: string;
	readonly proportionalFontFamily?: string;
}
