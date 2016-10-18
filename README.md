# jsonp
jsonp request

### Usage

install
```npm i lc-jsonp --save```

code example
```js
var jsonp = require('lc-jsonp');
jsonp('http://www.example.com', {arg: 1})
    .then(function(res){
            console.log(res);
        }
    );
```
### Warning
This module will occupy a global name window.loadJsonp. Please keep in mind of it.