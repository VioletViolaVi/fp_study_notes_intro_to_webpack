# Intro to Webpack

## Module Bundlers

As our projects get bigger and more complex, it’s often useful to use a module bundler to automate a lot of tasks for us, especially around deployment.

Bundlers allow us to import code from files and folders into other files and folders.

An example of this would be moving development code into a `dist` folder which only contains the code you want to deploy and leaving out folders/files such as tests which could be a security risk.

## Webpack

Webpack is a popular open-source JavaScript module bundler, able to copy static files, transpile ES6 to ES5 and more.

## Setup

To use Webpack we need to go through some setup.

Begin by creating a project repository and running the standard `git init` and `npm init`.

### Install Webpack

`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`

We use the `--save-dev` as we only need these for development and not production

### Install Loaders

We use these to add support for various file types.

`npm install babel-loader style-loader css-loader sass-loader node-sass --save-dev`

### Install Babel

We use this to tanspile ES6 to ES5.

`npm install @babel/core @babel/preser-env @babel/preset-react`

### Folders and FIles

To configure babel, we need to create a file called `.babelrc` and write in the following:

```json
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

We also need to create an `src` and a `public` folder to store our source code and assets.

Our next task is to instruct Webpack on how it should work by creating a `webpack.config.js` file and inserting the following:

```js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
```

Finally we should add some scripts to our `package.json`.

```json
"start": "webpack-dev-server --mode-development",
"build": "webpack -p"
```