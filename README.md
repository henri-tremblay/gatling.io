# Gatling.io

## Modules

### Install

First, as we are now using Gulp#4, you need to get rid of Gulp#3:
```bash
$ npm uninstall gulp -g
```

Then, just do the following, which will globally install the new Gulp#4 cli:
```bash
$ npm install gulpjs/gulp-cli#4.0 -g
```

Finally, in the web client directory:
```bash
[... gatling.io ]$ bower install
[... gatling.io ]$ npm install
```

`npm install` triggers `bower install`. So you can skip the first instruction.

Bower install dependencies in `libs` while NPM install dependencies in `node_modules`. Just delete
these directories for a clean installation.

### Configuration

You must add a config.js file in the components directory :
```bash
[... gatling.io ]$ cp src/app/core/components/config.sample.js src/app/core/components/config.js
```

Then you can edit the config.js file.

### Update

You must do both:
```bash
[... gatling.io ]$ bower list
[... gatling.io ]$ npm-check-updates
```

Note that `ncu` is a working shortcut for `npm-check-updates`.

Some packages are locked (with the `=` sign) in `package.json`. This usually means newer versions
breaks compatibility and a working solution wasn't found yet.

## Build

Main chains are:
```bash
[... gatling.io ]$ gulp inject
[... gatling.io ]$ gulp build
```

## Launching

You can start a server using the following gulp task:
```bash
[... gatling.io ]$ gulp serve
```

This will execute all the inject tasks, then start a server on port `3000`. In this task, only SASS
files are compiled. JavaScripts being executed as is.

To optimize everything, then start a server on a production ready build, run the following task:
```bash
[... gatling.io ]$ gulp serve:build
```

Which runs the `clean`, and `build` tasks in series.

## Packaging

The same series can be launched and archived using this task:
```bash
[... gatling.io ]$ gulp package
```

This will produce a versioned package deduced from the `package.json` file in the `dist` directory.
