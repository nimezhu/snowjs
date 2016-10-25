var snow = snow || {};
/* name snow.tools
 * version 0.0.1
 *  utils
 */
(function(S,d3){
  S.tools = S.tools || {};
  S.tools.map2tsv = function(d, orderedLabels) {
  	var labels = Object.keys(d)
  	if(orderedLabels!=undefined) {
  		labels = orderedLabels
  	}
  	var data={"table":{"rows":[],"cols":[]}}
  	console.log(labels)
  	data.table.cols = labels.map(function(d0,i){
  		return {"label":d0}
  	})
  	data.table.rows = d[labels[0]].map(function(d0,i){
  			return {
  				"c": data.table.cols.map(function(k){
  					return {"v":d[k.label][i]}
  					})
  			}
  	})
  	return data
  }
  S.tools.randomString = function(length) {
  	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  	if (! length) {
  		length = Math.floor(Math.random() * chars.length);
  	}

  	var str = '';
  	for (var i = 0; i < length; i++) {
  		str += chars[Math.floor(Math.random() * chars.length)];
  	}
  	return str;
  }
  S.tools.getUrlParam= function(name) {
  	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  }
  S.tools.getUrlParamList= function(name) {
  	var a=S.tools.getUrlParam(name)
  	if(!a) {return []}
  	a=a.split(",")
  	var b=[]
  	a.forEach(function(d){b.push(parseInt(d))})
  	return b;
  }
  var jsonp = function(url){
  	var script = window.document.createElement('script');
  	script.async = true;
  	script.src = url;
  	script.onerror = function()
  	{
  		alert('Can not access JSONP file.')
  	};
  	var done = false;
  	script.onload = script.onreadystatechange = function()
  	{
  		if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'))
  		{
  			done = true;
  			script.onload = script.onreadystatechange = null;
  			if (script.parentNode)
  			{
  				return script.parentNode.removeChild(script);
  			}
  		}
  	};
  	window.document.getElementsByTagName('head')[0].appendChild(script);
  };
  S.tools.gsheetQuery = function(sql, key,callback){
  	if (typeof callback == "undefined") {callback="console.log"}
  	var url = 'http://spreadsheets.google.com/a/google.com/tq?',
  	params = {
  		key: key,
  		tq: encodeURIComponent(sql),
  		tqx: 'responseHandler:' + callback
  	},
  	qs = [];
  	for (var key in params)
  	{
  		qs.push(key + '=' + params[key]);
  	}
  	url += qs.join('&');
  	jsonp(url); // Call JSONP helper functiona
  }

}(snow,d3))
