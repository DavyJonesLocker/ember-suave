# Ember Suave

[![Build Status](https://travis-ci.org/dockyard/ember-suave.svg?branch=master)](https://travis-ci.org/dockyard/ember-suave)

Ensures super stylish code by enforcing the DockYard JavaScript and
Ember style guide rules.

![suave](http://i.imgur.com/zM1X686.gif)

* [JavaScript Style Guide](https://github.com/dockyard/styleguides/blob/master/javascript.md)
* [Ember Style Guide](https://github.com/dockyard/styleguides/blob/master/ember.md)

## Installation

```bash
ember install ember-suave
```

## Usage

`ember-suave` is used as a JSCS preset, and can be enabled by adding a `preset` to your `.jscsrc` file.

```
{
  "preset": "ember-suave"
}
```

`ember-suave` integrates well with ember-cli, but can also be used as a standalone JSCS preset. This allows custom
editor integration, and non-ember-cli projects to utilize our curated set of rules.

When used from within ember-cli, your test suite will automatically fail if any of the rules are broken.

## JSCS Rules

### Default Rules

`ember-suave` comes preconfigured with DockYard-curated [JSCS rules](https://github.com/dockyard/ember-suave/blob/master/lib/jscsrc.json)
so that all you need to do is install the addon and start writing stylish code.

### Customization

If `ember-suave` isn't suave enough for you and you'd like to override
certain rules, simply add your own rules to `.jscsrc` at the root of
your Ember CLI project. Those rules will take precedence over the ones in the
default preset.

You can specify any of the [rules](http://jscs.info/rules.html) that are
built into JSCS, provide your own custom ones, or even override the ones we
have enabled by default.

To disable a rule, set its value to `null`.

```json
// .jscsrc
{
  "preset": "ember-suave",
  "additionalRules": ["./lib/rules/*.js"],
  "myAwesomeCustomRule": true,
  "disallowDanglingUnderscores": true,
  "disallowEmptyBlocks": null
}
```

## Development

* `git clone` this repository
* `npm install`

## Running Tests

* `npm test`

## Versioning

This library follows [Semantic Versioning](http://semver.org).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
