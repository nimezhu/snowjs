var snow4 = snow4 || {};
snow4.chart = snow4.chart || {};
/* name : snow4.chart.scatter
* version : 0.0.5
*    render tsv into scatter Plot
* feature:
*    logscale, linear scale, or category color
*/

(function(S,d3){
S.chart.scatter = function(cb) {
  var width = 280;
  var height = 280;
  var padding = 20;
  var leftPadding=80;
  var scale=1.0;
  var data={} //tsv json data  google sheet format
  var title = "Scatter Plot V5"
  var x, y, z;
  var scaleType;
  var xScaleType = "linear";
  var yScaleType = "linear";
  var zScaleType = "linear";
  var xLabel;
  var yLabel;
  var vdots;
  var send = function(x) {
    console.log(x)
  }
  var  scaleTypeMap = {
    "log":d3.scaleLog,
    "category":d3.scaleCategory10,
    "linear":d3.scaleLinear
  }
  var initScaleTypeDomain = function(type,column) { //column zero index.
    if (!scaleTypeMap[type]) {
      var s = function(x) {
        return type
      }
      s.range = function(x){
        return s
      }
      return s
    }
    var scale = scaleTypeMap[type]()

    if (type=="log") {
      var d = d3.extent(data.table.rows, function(d) { return parseFloat(d.c[column].v); });
      if (d[0]<=0.0) {
        d[0]=0.1
      }
      scale.clamp(true).domain(d).nice();
    }
    else if (type=="linear") {
      scale.domain(d3.extent(data.table.rows, function(d) {
        return parseFloat(d.c[column].v); }
      )).nice();
    }
    else if (type=="category") {
      var groups={};
      data.table.rows.forEach(function(d,i){
        if(!groups[d.c[column].v]){groups[d.c[column].v]=[]}
        groups[d.c[column].v].push(i)
      })
      scale.domain(Object.keys(groups).sort())
    }
    else {
      return function(x) {return "grey"} //no scale
    }
    scale.groups = groups;
    return scale
  }
  var heatColor = ["lime","red"]
  var chart = function(selection) {
    var xScale=initScaleTypeDomain(xScaleType || scaleType,x)

      .range([0, width])
    var yScale=initScaleTypeDomain(yScaleType || scaleType,y)

      .range([height,0])
    var zScale=initScaleTypeDomain(zScaleType || scaleType,z)
    if (zScaleType!="category") {
      zScale.range(heatColor)
    }
    /* init svg */
    selection.selectAll("svg").remove();
    var svg = selection.append("svg")
    .attr("height",height+2*padding)
    .attr("width",width+2*leftPadding)



    /* axes */
    console.log("yScale.domain",yScale.domain())
    console.log("xScale.domain",xScale.domain())
    var yAxis = d3.axisLeft().scale(yScale)
    var yAxisGroup = svg.append("g")
    .attr("transform","translate("+leftPadding+","+padding+")")
    .attr("class","yAxis")
    .call(yAxis);

    if(yLabel){
      var yL = yAxisGroup.selectAll("text").data([yLabel])
      yL.enter().append("text")
      .style("text-archor","middle")
      yL.text(function(d){return d});
      yL.exit().remove();
    } else {
      var yL = yAxisGroup.selectAll("text").data([data.table.cols[y].label])
      yL.enter().append("text")
      .style("text-archor","middle")
      yL.text(function(d){return d});
      yL.exit().remove();
    }


    var xAxis = d3.axisBottom().scale(xScale)
    var xAxisGroup = svg.append("g")
    .attr("transform","translate("+leftPadding+","+(height+padding)+")")
    .attr("class","xAxis")
    .call(xAxis);

    if(xLabel){
      var xL = xAxisGroup.selectAll("text").data([xLabel])
      xL.enter().append("text").style("text-archor","left")
      xL.text(function(d){return d});
      xL.exit().remove();
    } else {
      var xL = xAxisGroup.selectAll("text").data([data.table.cols[x].label])
      xL.enter().append("text").style("text-archor","left")
      xL.text(function(d){return d});
      xL.exit().remove();
    }


    /* brushes */
    var brushCb = function() {
      var t = 0;
      var results=[];
      var extent =  d3.event.selection;
      var x0 = xScale.invert(extent[0][0]),
      y1 = yScale.invert(extent[0][1]),
      x1 = xScale.invert(extent[1][0]),
      y0 = yScale.invert(extent[1][1])
      //console.log(x0,x1,xScale.domain(),y0,y1,yScale.domain())
      data.table.rows.forEach(function (d,i) {
        if (x0 <= d.c[x].v && d.c[x].v <= x1 && y0 <= d.c[y].v && d.c[y].v <= y1)
        { t += 1;
          results.push(i)}
        })
        console.log(results);
        send({"code":"region","data":results});
      }
      var brush = d3.brush().on("brush",brushCb);


      /*** dots *****/

      var dots=svg.append("g")
      .attr("class","dots")
      .attr("transform","translate("+leftPadding+","+padding+")")
      //.attr("transform","scale("+scale+")");
      .call(brush);
      console.log(data.table.rows)
      vdots=dots.selectAll(".d").data(data.table.rows);
      vdots.exit().remove()
      vdots.enter().append("circle")
      .attr("class","d")
      .merge(vdots)
      .attr("id",function(d,i){return "n"+i})
      .attr("cx",function(d,i){return xScale(d.c[x].v);})
      .attr("cy",function(d,i){return yScale(d.c[y].v);})
      .attr("r",2.0)
      .attr("fill",function(d,i){
        return zScale(d.c[z].v);
      })
      .attr("opacity",0.3)
      .on("mouseover",function(d,i) { send({"code":"mouseover","data":i});d3.select(this).attr("r",5.0).attr("opacity",1.0);})
	     .on("mouseout",function(d,i) {send({"code":"mouseout","data":i});d3.select(this).attr("r",2.0).attr("opacity",0.7);});

      if (zScaleType=="category") {
        svg.selectAll(".legend_g").remove()
        var legend_g =svg.append("g").attr("transform","translate("+leftPadding+","+padding+")").attr("class","legend_g")
        var legend=legend_g.selectAll(".legend")
        .data(zScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0,"+(i*20)+")"; });
        legend.append("rect")
        .on("mousedown",function(d,i) {send({"code":"region","data":zScale.groups[d]});}) //self.legendMouseClickCb(z_group[d],d)})
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d,i){return zScale(d)})
        //.on("mouseover",function(d,i) {d3.select(this).attr("width",22).attr("x",width-20);})
        //.on("mouseout",function(d,i) {d3.select(this).attr("width",18).attr("x",width-18);})
        legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
      } else {
        svg.selectAll(".legend_g").remove()
      }
    }
    chart.process = function(c) {
      var set = new Set(c)
      vdots.attr("opacity",function(d,i){
        if (set.has(i)) {
          return 1.0
        }
        return 0.3
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
    chart.width = function(x) {
      if(!arguments.length) {
        return width
      }
      else {
        width=x;
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
    chart.padding= function(x) {
      if(!arguments.length) {
        return padding
      }
      else {
        padding=x;
        return chart;
      }
    }
    chart.scale= function(x) {
      if(!arguments.length) {
        return scale
      }
      else {
        scale=x;
        return chart;
      }
    }
    chart.xScaleType = function(x) {
      if(!arguments.length) {
        return xScaleType
      }
      else {
        xScaleType=x;
        return chart;
      }
    }
    chart.yScaleType = function(x) {
      if(!arguments.length) {
        return yScaleType
      }
      else {
        yScaleType=x;
        return chart;
      }
    }
    chart.zScaleType = function(x) {
      if(!arguments.length) {
        return zScaleType
      }
      else {
        zScaleType=x;
        return chart;
      }
    }
    chart.title = function(x) {
      if(!arguments.length) {
        return title
      }
      else {
        title=x;
        return chart;
      }
    }
    chart.x = function(d) {
      if(!arguments.length) {
        return x
      }
      else {
        x=d;
        return chart;
      }
    }
    chart.y = function(d) {
      if(!arguments.length) {
        return y
      }
      else {
        y=d;
        return chart;
      }
    }
    chart.z = function(d) {
      if(!arguments.length) {
        return z
      }
      else {
        z=d;
        return chart;
      }
    }
    chart.xLabel = function(d) {
      if(!arguments.length) {
        return xLabel
      }
      else {
        xLabel=d;
        return chart;
      }
    }
    chart.yLabel = function(d) {
      if(!arguments.length) {
        return yLabel
      }
      else {de
        yLabel=d;
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
    return chart;
  };
}(snow4,d3))
