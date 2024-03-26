export default function ConvertCmykToRgb([c, m, y, k]: readonly [
	number,
	number,
	number,
	number
]): readonly [number, number, number] {
	const range = 255;
	const k2 = 1 - k;

	const r = range * (1 - c) * k2;
	const g = range * (1 - m) * k2;
	const b = range * (1 - y) * k2;

	return [r, g, b] as const;
}
