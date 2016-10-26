var snow = snow || {};
/* name : snow.chart.list
 * version : 0.0.1
 */
 (function(S,d3){
   S.chart.list = function() {
   	var height = 300
   	var width = 500
   	var data = {}
   	var col = 0
   	var rows = []
    var send = function(d) {
      console.log(d)
    }
   	var chart = function(selection) {
   		var ul = selection.selectAll("ul").data([0])
   		ul.exit().remove()
   		ul.enter().append("ul").attr("class","list")
   		var li = ul.selectAll("li").data(rows)
   		li.exit().remove()
   		li.enter().append("li")
   		li.text(function(d){
   			return data.table.rows[d].c[col].v
   		}).on("click",function(d){
        send(d)
      })
   		;
   	}
    chart.send = function(d) {
   		if(!arguments.length) {
   			return send
   		}
   		else {
   			send=d;
   			return chart;
   		}
   	}
   	chart.rows = function(d) {
   		if(!arguments.length) {
   			return rows
   		}
   		else {
   			rows=d;
   			return chart;
   		}
   	}
   	chart.col = function(d) {
   		if(!arguments.length) {
   			return col
   		}
   		else {
   			col=d;
   			return chart;
   		}de
   	}
   	chart.data = function(d) {
   		if(!arguments.length) {
   			return data
   		}
   		else {
   			data=d;
   			return chart;
   		}
   	}
   	return chart
   }
 }(snow,d3))
