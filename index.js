window.loadJsonp = {};
window.loadJsonp.counter = 0;
module.exports = function jsonp(url, parameter) {
    return new Promise(function (resolve) {
        var callbackName = 'cb_' + window.loadJsonp.counter;
        var fullCallbackName = 'window.loadJsonp.' + callbackName;
        window.loadJsonp.counter++;
        window.loadJsonp[callbackName] = function (res) {
            resolve(res);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
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
        script.setAttribute('src', url + query.join('&'));
        head.appendChild(script);
        script.addEventListener('load', function () {
            script.parentElement.removeChild(script);
            delete window.loadJsonp[callbackName];
        });
    });
};
