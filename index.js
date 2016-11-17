window.loadJsonp = {};
window.loadJsonp.counter = 0;
var jsnop = function (url, parameter) {
    return new Promise(function (resolve, reject) {
        //make callback
        var callbackName = 'cb_' + window.loadJsonp.counter;
        var fullCallbackName = 'window.loadJsonp.' + callbackName;
        window.loadJsonp.counter++;
        window.loadJsonp[callbackName] = function (res) {
            resolve(res);
            delete window.loadJsonp[callbackName];
        };
        //make url
        var query = [];
        if(parameter){
            for(var key in parameter){
                if(parameter.hasOwnProperty(key)){
                    query.push(key + '=' + encodeURIComponent(parameter[key]));
                }
            }
        }
        if(/callback=/.test(url)){
            url.replace(/callback=.*&?/, 'callback=' + fullCallbackName);
        }else{
            query.push('callback=' + fullCallbackName);
        }
        if(!/\?/.test(url)){
            url += '?';
        }
        var fullUrl = url + query.join('&');
        if(fullUrl.length > 2000){
            console.error('jsonp request url too long. Request failed.');
            delete window.loadJsonp[callbackName];
            return;
        }
        //make request
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.addEventListener('load', function () {
            script.parentElement.removeChild(script);
        });
        script.addEventListener('error', function () {
            console.error('jsonp load error');
            reject();
            script.parentElement.removeChild(script);
        });
        script.setAttribute('src', fullUrl);
        head.appendChild(script);
    });
};
module.exports = jsnop;