# jsonp
jsonp request

### Usage

install

```npm i lc-jsonp --save```

code example(webpack)
```js
var jsonp = require('lc-jsonp');
var url = 'http://www.example.com';
var arg = {id: 1};

jsonp(url, arg)
    .then(function(res){
            console.log(res);
        }
    );

//jsonp is a Promise object, you can use bluebird resolve it and use timeout function.
var Promise = require('bluebird');
var timeout = 300; //milliseconds
Promise.resolve(jsonp(url, arg))
    .timeout(timeout, 'TimeoutError')
    .then(function(res){
            console.log(res);
        }
    ).catch(new Error('TimeoutError'), function() {
      console.error('Request time out, do something.');
    });
```
### Warning
1. This module will occupy a global variable, named window.loadJsonp. Please keep in mind of it.
2. This module only work for CommonJS. Please use webpack etc to use this module.
3. Url can not contain query string.
4. Please include Promise shim if you run it in old browser.

### test
Install npm packages```npm i```, then start server ```npm start```, then open url ```http://localhost:3011/test/test.html``` in browser.