# A generator for a generic es6 module

`generator-gulp-webpack-es6` scaffolds out an `ES6` module that supports `imports`.

- Provides 2 ways to run dev server: `browser-sync` and `webpack-dev-server`.
- The sample module displays a circle using `d3.js`.

## Installing generator-gulp-webpack-es6

```
$ npm install -g yo generator-gulp-webpack-es6
```

## Creating a module

```
$ mkdir module_dir_name
$ cd module_dir_name
$ yo gulp-webpack-es6
```

You will be asked to enter a `module name` (e.g. `circle`) and other items.

`module_dir_name` is the name of the module root directory (e.g., `circle_module`). `module_dir_name` may be different from the `module name` (e.g., `circle`).

## Running local server

### using `browser-sync`

```
$ gulp serve
```
The result will be in the `.tmp/` directory.

### using `webpack-dev-server`

```
$ gulp webpack_dev
```

Opening the given `url` should display a circle:

<div>
<img src="https://rawgit.com/saun4app/generator-gulp-webpack-es6/master/circle.svg">
</div>

# Building a release version

```
$ gulp build
```

The result will be in the `dist` directory.

## Module Directory Structure

The directory structure generated using `gulp-webpack-es6` is organized so that the configuration files are in the `root` directory (.e.g. circle_module), all of the code is in the `app` subdirectory, unit tests are in `test` and the compiled javascript is in `dist`:

```
.
├── app
│   ├── index.html
│   ├── scripts
│   │   ├── circle.js
│   │   └── helper_module.js
│   └── styles
│       └── circle.css
├── bower.json
├── dist
│   ├── index.html
│   └── scripts
│       └── circle.js
├── gulpfile.babel.js
├── package.json
└── webpack.config.js
└── webpack_dev.config.js
```

## Resources

- <http://emptypipes.org/2016/03/02/es6-module/>
- <http://emptypipes.org/2016/12/06/webpack-dev-server/>
- <https://webpack.github.io/docs/webpack-dev-server.html>
- <http://webpack.github.io/docs/tutorials/getting-started/#development-server>
