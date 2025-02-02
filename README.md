# Ansi-Parse

This is a simple library for parsing ANSI escape codes in strings.

## Usage

The primary use case is to provide a basis for supporting rendering text
with ANSI escape codes.

To this end, this library accepts as input a string containing such ANSI codes
and produces a series of objects that describe segments of the original text,
along with their associated ANSI states. The goal is to produce a data structure
that can be consumed to render the text in a graphical environment.

For instance:

```javascript
import { Parse } from '@altearius/ansi-parse';

const text = 'Hello \x1b[31mworld\x1b[0m!';
console.log(...Parse(text));
```

This will output:

```json
{
  "state": {
    "intensity": "normal", // bold | faint | normal
    "italic": false,
    "underline": "none", // double | none | single
    "blink": "none", // fast | none | slow
    "inverted": false,
    "concealed": false,
    "crossedOut": false,
    "proportional": false,
    "foreground": "default",
    "background": "default",
    "font": "primary", // fraktur | primary | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    "framed": false,
    "circled": false,
    "overlined": false
  },
  "value": "Hello "
} {
  "state": {
    "intensity": "normal",
    "italic": false,
    "underline": "none",
    "blink": "none",
    "inverted": false,
    "concealed": false,
    "crossedOut": false,
    "proportional": false,
    "foreground": "red",
    "background": "default",
    "font": "primary",
    "framed": false,
    "circled": false,
    "overlined": false
  },
  "value": "world"
} {
  "state": {
    "intensity": "normal",
    "italic": false,
    "underline": "none",
    "blink": "none",
    "inverted": false,
    "concealed": false,
    "crossedOut": false,
    "proportional": false,
    "foreground": "default",
    "background": "default",
    "font": "primary",
    "framed": false,
    "circled": false,
    "overlined": false
  },
  "value": "!"
}
```

### Color Values

The `foreground` and `background` properties represent colors. ANSI describes
colors by name, by index, or by values within a color space. When possible,
the named colors are used. Otherwise, all colors are represented as RGB values,
including conversions from CMY and CMYK as needed.

Supported color names:

- black
- blue
- cyan
- default
- green
- magenta
- red
- white
- yellow
- _and the *bright* versions of each, such as `bright blue`_

### Initial State

It is possible to seed the process with an initial state. This is useful, for
instance, for determining the correct rendering of a series of lines in a log
file, in which case the state of each new line would depend on the final state
of the previous line.

For instance:

```javascript
import { AnsiState, Parse } from '@altearius/ansi-parse';

const text = '\x1b[31mHello \x1b[32mworld\x1b[0m!';
const initialState = new AnsiState();
initialState.foreground = 'red';

console.log(...Parse(text, initialState));
```

## API Reference

This package exposes a `Parse` function and an `AnsiState` class.

### Parse

The `Parse` function has the following signature:

```typescript
function* Parse(
  ansi: string,
  initialState?: AnsiState
): Generator<{ state: AnsiState; value: string }, AnsiState>;
```

### AnsiState

The `AnsiState` class describes the current rendering flags. It has the
following properties:

| Property     | Type                          |
| ------------ | ----------------------------- |
| intensity    | `bold`, `faint`, or `normal`  |
| italic       | boolean                       |
| underline    | `double`, `none`, or `single` |
| blink        | `fast`, `none`, or `slow`     |
| inverted     | boolean                       |
| concealed    | boolean                       |
| crossedOut   | boolean                       |
| proportional | boolean                       |
| foreground   | `AnsiColor`                   |
| background   | `AnsiColor`                   |
| font         | AnsiFont                      |
| framed       | boolean                       |
| circled      | boolean                       |
| overlined    | boolean                       |

The `AnsiColor` type represents a color. It can be one of the following:

- `readonly [number, number, number]` representing an RGB color. ANSI color
  codes that originate from a color space other than RGB are converted to RGB.
- `'default'`
- `'transparent'`

Or, it can be one of the following named colors:

- `'black'`
- `'blue'`
- `'cyan'`
- `'green'`
- `'magenta'`
- `'red'`
- `'white'`
- `'yellow'`
- `'bright black'`
- `'bright blue'`
- `'bright cyan'`
- `'bright default'`
- `'bright green'`
- `'bright magenta'`
- `'bright red'`
- `'bright white'`
- `'bright yellow'`
