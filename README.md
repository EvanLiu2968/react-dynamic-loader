# react-dynamic-loader

[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/EvanLiu2968/react-dynamic-loader)[![npm](https://img.shields.io/npm/v/react-dynamic-loader.svg)](https://www.npmjs.com/package/react-dynamic-loader)[![continuousphp](https://img.shields.io/continuousphp/git-hub/doctrine/dbal/master.svg)](https://www.npmjs.com/package/react-dynamic-loader)

> Dynamic async load component for react with webpack chunk

## Install
```bash
npm install react-dynamic-loader --save
```
```javascript
import dynamicLoader from 'react-dynamic-loader'
// or
var dynamicLoader = require('react-dynamic-loader')
```

## Options

| Option   |   Type   |  Default |  Description |
|----------|----------|----------|--------------|
| `loader` | Function | null | return Promise object |
|`loading` | Boolean or JSX  |`<div className="async-loading">loading...</div>` | the JSX instead when component is loading |
| `error`  | Boolean or JSX  |`<div className="async-error">some error occurred.</div>` | the JSX instead when error occurred |
| `delay`  | Number   |  200 | time of the component delay to instead when it's loaded |

## Usage

### Basic usage

```javascript
import dynamicLoader from 'react-dynamic-loader'
const Home = dynamicLoader({
  loader: () => import(/* webpackChunkName: "my-chunk-name" */"../pages/home")
});
/* webpack build chunk files
chunk
  - [my-chunk-name].[hash].js
 */
```

### Add loading and error state

```javascript
import dynamicLoader from 'react-dynamic-loader'
import { Spin } from 'antd'
const Home = dynamicLoader({
  loader: () => import(/* webpackChunkName: "my-chunk-name" */"../pages/home"),
  loading: <div className="async-loading"><Spin size="large" /></div>,
  error: <div className="async-error">some error occurred.</div>,
  delay: 300
});
```

### <span id="requireUsage">With require usage</span>

```javascript
import dynamicLoader from 'react-dynamic-loader'
const Home = AsyncLoader({
  loader: () => new Promise((resolve,reject)=>{
    require.ensure([], require => {
      resolve(require("../pages/home"));
    }, "my-chunk-name");
  })
});
/* webpack build chunk files
chunk
  - [my-chunk-name].[hash].js
 */
```
### Demo

[https://www.evanliu2968.com.cn](https://www.evanliu2968.com.cn/system)

## Introduction

react-router v4 remove the default asyncLoader `getComponent` of v3, so we can do it ourself.

The main methods of async load files with webpack are as follows

1. `require.ensure`

```javascript
const Component = getComponent((callback) => {
  require.ensure([], require => {
    callback(null, require("./component").default);
  }, 'chunk-name');
});
```
Demo is [With require usage](#requireUsage)

2. `syntax dynamic import`

`import()` return the Promise object, callback the value of `export`

```javascript
const loader = import('./component')
loader.then((e)=>{
  let Component = e.default
})
```
the method require support with `babel-plugin-syntax-dynamic-import`

`.babelrc` configure demo
```json
{
  "plugins": [
     "syntax-dynamic-import",
  ]
}
```

## License

[MIT](LICENSE)