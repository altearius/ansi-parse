export default function ConvertCmyToRgb([c, m, y]: readonly [
	number,
	number,
	number
]) {
	const range = 255;
	const r = range * (1 - c);
	const g = range * (1 - m);
	const b = range * (1 - y);

	return [r, g, b] as const;
}
