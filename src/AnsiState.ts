import type AnsiColor from './color/AnsiColor';

// Justificatoin: Refers the the "alternate font" slots listed in the standard
// as ranging from 1 - 9.
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type AnsiFont = 'fraktur' | 'primary' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default class AnsiState {
	public intensity: 'bold' | 'faint' | 'normal';
	public italic: boolean;
	public underline: 'double' | 'none' | 'single';
	public blink: 'fast' | 'none' | 'slow';
	public inverted: boolean;
	public concealed: boolean;
	public crossedOut: boolean;
	public proportional: boolean;
	public foreground: AnsiColor;
	public background: AnsiColor;
	public font: AnsiFont;
	public framed: boolean;
	public circled: boolean;
	public overlined: boolean;

	public constructor(previousContext?: AnsiState) {
		if (previousContext) {
			this.intensity = previousContext.intensity;
			this.italic = previousContext.italic;
			this.underline = previousContext.underline;
			this.blink = previousContext.blink;
			this.inverted = previousContext.inverted;
			this.concealed = previousContext.concealed;
			this.crossedOut = previousContext.crossedOut;
			this.font = previousContext.font;
			this.proportional = previousContext.proportional;
			this.foreground = previousContext.foreground;
			this.background = previousContext.background;
			this.framed = previousContext.framed;
			this.circled = previousContext.circled;
			this.overlined = previousContext.overlined;
		} else {
			this.intensity = 'normal';
			this.italic = false;
			this.underline = 'none';
			this.blink = 'none';
			this.inverted = false;
			this.concealed = false;
			this.crossedOut = false;
			this.font = 'primary';
			this.proportional = false;
			this.foreground = 'default';
			this.background = 'default';
			this.framed = false;
			this.circled = false;
			this.overlined = false;
		}
	}

	public reset() {
		this.intensity = 'normal';
		this.italic = false;
		this.underline = 'none';
		this.blink = 'none';
		this.inverted = false;
		this.concealed = false;
		this.crossedOut = false;
		this.proportional = false;
		this.font = 'primary';
		this.foreground = 'default';
		this.background = 'default';
		this.framed = false;
		this.circled = false;
		this.overlined = false;
	}
}
