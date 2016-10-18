# jsonp
jsonp request

### Usage

install

```npm i lc-jsonp --save```

code example(webpack)
```js
var jsonp = require('lc-jsonp');
var url = 'http://www.example.com';
jsonp(url, {arg: 1})
    .then(function(res){
            console.log(res);
        }
    );
```
### Warning
1. This module will occupy a global name window.loadJsonp. Please keep in mind of it.
2. This module only work for CommonJS. Please use webpack etc to use this module.
3. Url argument can not contain query string.
4. Please include Promise shim if you run it in old browser.