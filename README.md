# AsyncLoader

> async load component for react with webpack chunk

## Usage

### Basic usage

```javascript
const Home = AsyncLoader({
  loader: () => import(/* webpackChunkName: "my-chunk-name" */"../pages/home")
});
/* webpack build chunk files
chunk
  - [my-chunk-name].[hash].js
 */
```

### Add loading and error state

```javascript
import { Spin } from 'antd'
const Home = AsyncLoader({
  loader: () => import(/* webpackChunkName: "my-chunk-name" */"../pages/home"),
  loading: <div className="async-loading"><Spin size="large" /></div>,
  error: <div className="async-error">some error occurred.</div>,
  delay: 300
});
```

### <span id="requireUsage">With require usage</span>

```javascript
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

[https://www.evanliu2968.com.cn](https://www.evanliu2968.com.cn/system/home)

## Options

| Option   |   Type   |  Default |  Description |
|----------|----------|----------|--------------|
| `loader` | Function | null | return Promise object |
|`loading` | Boolean  |`<div className="async-loading">loading...</div>` | the JSX instead when component is loading |
| `error`  | Boolean  |`<div className="async-error">some error occurred.</div>` | the JSX instead when error occurred |
| `delay`  | Number   |  200 | time of the component delay to instead when it's loaded |

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

2. `Syntax Dynamic Import`

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