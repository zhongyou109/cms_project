// (function(window, document, undefined) {
  'use strict';
  var jsonp = function(url, data, callback) {
    //如果页面中有了先删除
    var child=document.getElementById("my_json_cb");
    if(child){
      document.body.removeChild(child);
    }
    var fnSuffix = Math.random().toString().replace('.', '');
    var cbFuncName = 'my_json_cb_' + fnSuffix;
    // 不推荐
    window[cbFuncName] = callback;
    var querystring = url.indexOf('?') == -1 ? '?' : '&';
    for (var key in data) {
      querystring += key + '=' + data[key] + '&';
    }
    querystring += '_jsonp=' + cbFuncName;
    var scriptElement = document.createElement('script');
    scriptElement.src = url + querystring;
    scriptElement.id = "my_json_cb";
    document.body.appendChild(scriptElement);
  };
  module.exports = jsonp;
// })(window, document);