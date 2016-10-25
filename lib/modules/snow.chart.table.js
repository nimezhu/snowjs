var snow = snow || {};
snow.chart = snow.chart || {};
/* name : snow.chart.table
 * version : 0.0.1
 */
 (function(S,d3){
   S.chart.table = function() {
   	var caption = ""
   	var data = {}
   	var chart=function(selection) {
   		/*
   		var s="<table class='table table-bordered table-striped'>"
   		if (caption) {
   			s+="<caption>"+caption+"</caption>"
   		}
   		data.table.cols.forEach(function(d) {
   			if(d.label=="") {s+="<th>"+d.id+"</th>"} else {s+="<th>"+d.label+"</th>"}
   		})
   		data.table.rows.forEach(function(d) {
   			s+="<tr>"
   			d.c.forEach(function(d0) {s+="<td>"+d0.v+"</td>"})
   			s+="</tr>"
   		})
   		s+="</table>"
   		selection.html(s)
   		*/
   		var table = selection.selectAll("table").data([data])


   		table.enter().append("table").classed("table",true).classed("table-bordered",true).classed("table-striped",true)
   		table.exit().remove()
   		var cap = table.selectAll("caption").data([caption])
   		cap.enter().append("caption")
   		cap.text(function(d){return d})
   		var thead = table.selectAll("thead").data([0])
   		thead.enter().append("thead")
   		thead.exit().remove()
   		var th = thead.selectAll("th").data(data.table.cols)
   		th.exit().remove()
   		th.enter().append("th")
   		th.text(function(d){
   			return d.label || d.id
   		})
   		var tbody = table.selectAll("tbody").data([0])
   		tbody.enter().append("tbody")
   		tbody.exit().remove()
   		var tr = table.selectAll("tr").data(data.table.rows)
   		tr.exit().remove()
   		tr.enter().append("tr")
   		var td = tr.selectAll("td").data(function(d){
   			return d.c
   		})
   		td.exit().remove()
   		td.enter().append("td")
   		td.text(function(d){return d.v})

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
   	chart.caption = function(x) {
   		if(!arguments.length) {
   			return caption
   		}
   		else {
   			caption=x;
   			return chart;
   		}
   	}
   	return chart

   }

 }(snow,d3))
