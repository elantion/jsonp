window.loadJsonp = {};
window.loadJsonp.counter = 0;
let jsnop = function (url, parameter) {
    return new Promise(function (resolve, reject) {
        //make callback
        let callbackName = 'cb_' + window.loadJsonp.counter;
        let fullCallbackName = 'window.loadJsonp.' + callbackName;
        window.loadJsonp.counter++;
        window.loadJsonp[callbackName] = function (res) {
            resolve(res);
            delete window.loadJsonp[callbackName];
        };
        //make url
        let query = [];
        if(parameter){
            for(let key in parameter){
                if(parameter.hasOwnProperty(key)){
                    query.push(key + '=' + encodeURIComponent(parameter[key]));
                }
            }
        }
        if(/callback=/.test(url)){
            url = url.replace(/callback=[^&]+/, 'callback=' + fullCallbackName);
        }else{
            query.push('callback=' + fullCallbackName);
        }
        if(!/\?/.test(url)){
            url += '?';
        }else{
            if(query.length){
                url += '&';
            }
        }
        let fullUrl = url + query.join('&');
        if(fullUrl.length > 2000){
            console.error('Jsonp request url too long. Request failed.');
            delete window.loadJsonp[callbackName];
            return;
        }
        //make request
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.addEventListener('load', function () {
            script.parentElement.removeChild(script);
        });
        script.addEventListener('error', function () {
            console.error('Jsonp load error');
            reject();
            script.parentElement.removeChild(script);
        });
        script.setAttribute('src', fullUrl);
        head.appendChild(script);
    });
};
module.exports = jsnop;