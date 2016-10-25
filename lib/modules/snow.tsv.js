var snow = snow || {};
/* name snow.tsv
 * version 0.0.1
 * Get Tsv from url and coding it into data.table
 */
(function(S,d3){
  S.tsv = function(url, callback) {
  	$.ajax({
  		type: "GET",
  		url: url,
  		dataType: "text",
  		success: function(fdata) {
  			var x = fdata.split("\n");
  			var cols = x[0].split("\t");
  			var data = {}
  			data["table"] = {}
  			data["table"]["cols"] = []
  			data["table"]["rows"] = []
  			cols.forEach(function(d) {
  				data.table.cols.push({
  					"label": d
  				})
  			})
  			var j = 0;
  			for (var i = 1; i < x.length; i++) {
  				var r = x[i].split("\t");
  				if (r.length == cols.length) {
  					data.table.rows.push({
  						"c": []
  					});
  					r.forEach(function(d) {
  						data.table.rows[j].c.push({
  							"v": d
  						})
  					})
  					j += 1;
  				}
  			}
  			callback(data)
  		}
  	});
  }
}(snow,d3))
