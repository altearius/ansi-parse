import type AnsiColor from './AnsiColor.js';
import ConvertCmyToRgb from './ConvertCmyToRgb.js';
import ConvertCmykToRgb from './ConvertCmykToRgb.js';
import Iso8613ColorMode from './Iso8613ColorMode.js';
import ResolveIndexedColor from './ResolveIndexedColor.js';
import type SgrColor from './SgrColor.js';

export default function ResolveColor(color: SgrColor): AnsiColor {
	switch (color.mode) {
		case Iso8613ColorMode.ImplementationDefined:
			return 'default';

		case Iso8613ColorMode.Transparent:
			return 'transparent';

		case Iso8613ColorMode.Rgb:
			return color.values;

		case Iso8613ColorMode.Cmy:
			return ConvertCmyToRgb(color.values);

		case Iso8613ColorMode.Cmyk:
			return ConvertCmykToRgb(color.values);

		case Iso8613ColorMode.Indexed:
			return ResolveIndexedColor(color.value);
	}
}
