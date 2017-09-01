# Ember Suave [![Build Status](https://travis-ci.org/DockYard/ember-suave.svg?branch=master)](https://travis-ci.org/DockYard/ember-suave)

**This library is based on JSCS linting rules and is no longer maintained. For
the ESLint equivalent, see [eslint-plugin-ember-suave](https://github.com/DockYard/eslint-plugin-ember-suave).**

Ensures super stylish code by enforcing the DockYard JavaScript and Ember style guide rules.

* [JavaScript Style Guide](https://github.com/dockyard/styleguides/blob/master/engineering/javascript.md)
* [Ember Style Guide](https://github.com/dockyard/styleguides/blob/master/engineering/ember.md)

![suave](http://i.imgur.com/zM1X686.gif)

### ESLint Installation and Usage

If you are using [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint) in your project, and you would like to also make use of all the ember-suave rules, we have great news! We have created [eslint-plugin-ember-suave](https://github.com/DockYard/eslint-plugin-ember-suave), which allows you to extend the recommended suave rules, right in your `.eslintrc.js`. Further instructions on usage and configuration can be found on the [eslint-plugin-ember-suave](https://github.com/DockYard/eslint-plugin-ember-suave) repo.

## JSCS Installation

```bash
ember install ember-suave
```

Post installation, you will find a `.jscsrc` file at the root of your project, with the following content:

```json
{
  "preset": "ember-suave"
}
```

This sets `ember-suave` as the default [JSCS](http://jscs.info/) preset.

## JSCS Usage

`ember-suave` integrates well with `ember-cli`, but can also be used as a standalone JSCS preset. This allows custom editor integration, and non-Ember CLI projects to utilize our curated set of rules.

When used from within `ember-cli`, your test suite will automatically fail if any of the rules are broken.

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

To disable a rule, set its value to `null` or `false`.

```json
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

Bug fixes will be released as minor or patch version bumps. In some limited cases, a bugfix might cause a previously ignored file or section to be parsed and trigger a failed test, but this is fairly unlikely.

Changing the preset in any way that causes previously passing tests to fail would require a major version bump. This will lead to a larger number of major version releases than a typical project, but provides consumers with relative safety in the use of `^X.Y.Z` style version ranges.

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
