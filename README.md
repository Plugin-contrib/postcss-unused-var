# postcss-lowercase-text

Postcss plugin to safely lowercase your `CSS` selectors and properties in order to minimize your gzip size

## Installation

```shell
npm install postcss-lowercase-text --save
```

## Usage

Refer the [PostCSS Documentation](https://github.com/postcss/postcss#usage) for using this plugin.

## Example

### Input

```css
A {
  color: red;
}

UL li {
  display : block
}

.classname {
  COLOR: red;
}

#someID {
  width: 100%;
}

H1#heading {
  color: red;
}

h1.heading{
  color: red;
}
.outerClass.INNERCLASS {
  color: red;
}
```

### Output

```css
a {
  color: red;
}

ul li {
  display : block
}

.classname {
  color: red;
}

#someID {
  width: 100%;
}

h1#heading {
  color: red;
}

h1.heading{
  color: red;
}
.outerClass.INNERCLASS {
  color: red;
}
```

## Explanation

All CSS style sheets are case-insensitive, except for parts that are not under the control of CSS. Like `id` and `class` are case sensitive so this plugin wont transform these things.

It will transform the selector where it is followed by  `id(s)` or `class(s)`

_example_

```css
H1.HEADING{
  color: red;
}
```

here it will transform the `H1` to `h1` but not the class `.HEADING`
