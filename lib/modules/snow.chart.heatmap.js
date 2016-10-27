var snow = snow || {};
/* name : snow.chart.heatmap
 * version : 0.0.1
 */
 (function(S,d3){
   S.chart = S.chart || {};
   S.chart.heatmap　= function() {
   	var data = {};
   	var cols;
   	var rows;
   	var rowHeight = 7;
   	var colWidth = 12;
   	var width = 300;
   	var height = 500;
   	var svg;
   	var norm = "row" // row, col , none assert it.
   	var scale = d3.scale.linear().domain([0,1]).range(["#FFFFFF","#FF0000"])
   	var send = function(d) {
   		console.log("send "+d)
   	}
   	var chart = function(selection) {
   			//IMPLEMENT ROW NORM FIRST
   		  svg = selection.selectAll("svg").data([0])
   			svg.exit().remove();
   			svg.enter().append("svg")
   			svg.attr("width",width)
   				 .attr("height",height);
   			var r = svg.selectAll(".r").data(rows)
   			r.exit().remove()
   			r.enter().append("g").attr("class","r")
   			r.attr("transform",function(d,i){ return "translate(0,"+i*rowHeight+")"})
   			var sum = rows.map(function(x,i){
   					var s = 0.0;
   					cols.forEach(function(y,j){
   						console.log(data,x,y)
   						s = s + parseFloat(data.table.rows[x].c[y].v)
   					})
   					return s;
   			})
   			var rects = r.selectAll("rect").data(function(x,i){
   				var a = []
   				cols.forEach(function(y,j){
   					a.push(parseFloat(data.table.rows[x].c[y].v)/sum[i])
   				})
   				return a
   			})
   			rects.exit().remove()
   			rects.enter().append("rect").attr("height",rowHeight*0.8).attr("width",colWidth*0.8)

   			rects.attr("x",function(d,i){
   				return i*colWidth
   			})
   			.attr("y",0)
   			.attr("fill",function(d,i){
   				return scale(d)
   			})
   			.on("click",function(d,i){
   				send(d3.select(this.parentNode).datum());
   			})

   	}
   	chart.data = function(x) {
   		if(!arguments.length) {
   			return data
   		}
   		else {
   			data=x;
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
   	chart.cols = function(d) {
   		if(!arguments.length) {
   			return cols
   		}
   		else {
   			cols=d;
   			return chart;
   		}
   	}
   	chart.norm = function(d) {
   		if(!arguments.length) {
   			return norm
   		}
   		else {
   			norm=d;
   			return chart;
   		}
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
   	chart.height = function(d) {
   		if(!arguments.length) {
   			return height
   		}
   		else {
   		 	height=d;
   			return chart;
   		}
   	}
   	chart.rowHeight = function(d) {
   		if(!arguments.length) {
   			return rowHeight
   		}
   		else {
   		  rowHeight=d;
   			return chart;
   		}
   	}
   	chart.width = function(d) {
   		if(!arguments.length) {
   			return width
   		}
   		else {
   			width=d;
   			return chart;
   		}
   	}
   	chart.colWidth = function(d) {
   		if(!arguments.length) {
   			return colWidth
   		}
   		else {
   			colWidth=d;
   			return chart;
   		}
   	}
   	return chart
   }

 }(snow,d3))
