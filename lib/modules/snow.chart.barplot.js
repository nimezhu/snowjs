var snow = snow || {};
/* name : snow.chart.barplot
 * version : 0.0.1
 */
 (function(S,d3){
   S.chart = S.chart || {};
   S.chart.barplot = function() {
   	var height = 200
   	var width = 200
   	var barwidth = 20
   	var gap = 2
   	var data = {}
   	var send = function(d) {
   		console.log("in barplot, send ",d)
   	}
   	var chart = function(selection){
   		//ldata.forEach(function(d){ld.push(parseFloat(d))});
   		/*    selection is svg.
   		*    data.title
   		*    data.array
   		*    data.cols
   		*/
   		var ldata=data.array;
   		var y=d3.scale.linear()
   		.domain([0, d3.max(ldata)])
   		.range([0, height]);
   		var y2=d3.scale.linear()
   		.domain([0, d3.max(ldata)])
   		.range([height, 0]);
   		var yAxis = d3.svg.axis()
   		.scale(y2)
   		.orient("left");
   		var svg = selection.selectAll("svg").data([0])
   		svg.enter().append("svg")

   		svg.exit().remove()
   		svg.attr('width', function(d){
   			var t=data.array.length*(barwidth+gap)+20
   			if  ( t > width )  {
   				return t
   			} else {
   				return width
   			}
   		})
   		.attr("height",height+300)
   		svg.selectAll('g').remove();
   		//  var text=selection.append("g").attr("class","txt")

   		//text.append("text").text(data.title)

   		var title = svg.selectAll(".title").data([data.title])
   		title.exit().remove()
   		title.enter().append("text")
   		.attr("class","title")
   		.attr("transform","translate(5,10)")
   		title.text(function(d){return d})


   		var fig = svg.selectAll(".fig").data([data.array])
   		fig.exit().remove()
   		fig.enter()
   		.append("g")
   		.attr('width', function(d){
   			var t=d.length*(barwidth+gap)+20
   			if  ( t > width )  {
   				return t
   			} else {
   				return width
   			}
   		})
   		.attr('height', height)
   		.attr('class', 'chart')
   		.attr("transform","translate(50,20)");

   		var bar = fig.selectAll('.bar')
   		.data(function(d){return d})
   		bar.exit().remove()
   		bar.enter().append('rect')
   		.attr('class', 'bar')

   		bar.attr('x', function(d, i) { return i * (barwidth+gap) })
   		.attr('y', function(d, i) { return height-y(d) })
   		.attr('width', function(d) { return barwidth})
   		.attr('height', function(d) {  return y(d);})
   		.style("fill","blue").append("title").text(function(d,i) {return data.cols[i]+":"+d});
   		;

   		var axis = fig.selectAll(".axis").data([0])
   		axis.exit().remove()
   		axis.enter().append("g")
   		.attr("transform","translate(-5,0)")
   		.attr("class", "axis")

   		axis.call(yAxis)
   		/*
   		.append("text")
   		.attr("class", "label")
   		.attr("transform", "rotate(-90)")
   		.attr("y", 6)
   		.attr("dy", ".71em")
   		*/

   		var text2=fig.selectAll(".txt").data([0])
   		text2.enter().append("g").attr("class","txt").attr("transform","translate(5,"+(height+25)+")")
   		text2.exit().remove()
   		var labels = text2.selectAll(".marker").data(data.cols)
   		labels.exit().remove()
   		labels.enter().append("g")
   		labels.selectAll("text").remove()
   		labels.attr("transform",function(d, i) { return "translate("+(i * (barwidth+gap)+barwidth/2) +",0)"})
   		.attr("class","marker")
   		.append("text")
   		.attr("transform","rotate(75)")
   		.text(function(d){return d});
   	}
   	chart.load = function(tab,row, cols, titleCol) {
   		/* load data from json table row and cols */
   		var r = tab.table.rows[row]
   		var labels = tab.table.cols
   		data.array=[]
   		data.cols =[]
   		data.title = r.c[titleCol].v
   		cols.forEach(function(i){
   			data.cols.push(labels[i].label)
   			data.array.push(parseFloat(r.c[i].v))
   		})
   		return chart
   	}
   	chart.send = function(x) {
   		if(!arguments.length) {
   			return send
   		}
   		else {
   			send=x;
   			return chart;
   		}
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
   	chart.width = function(x) {
   		if(!arguments.length) {
   			return width
   		}
   		else {
   			width=x;
   			return chart;
   		}
   	}
    chart.barwidth = function(x) {
   		if(!arguments.length) {
   			return barwidth
   		}
   		else {
   			barwidth=x;
   			return chart;
   		}
   	}
   	chart.height= function(x) {
   		if(!arguments.length) {
   			return height
   		}
   		else {
   			height=x;
   			return chart;
   		}
   	}
   	return chart
   }



 }(snow,d3))
