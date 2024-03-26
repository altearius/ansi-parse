type AnsiColor =
	| readonly [number, number, number]
	| 'black'
	| 'blue'
	| 'bright black'
	| 'bright blue'
	| 'bright cyan'
	| 'bright default'
	| 'bright green'
	| 'bright magenta'
	| 'bright red'
	| 'bright white'
	| 'bright yellow'
	| 'cyan'
	| 'default'
	| 'green'
	| 'magenta'
	| 'red'
	| 'transparent'
	| 'white'
	| 'yellow';

export default AnsiColor;
