var snow4 = snow4 || {};
/**
*  Version 0.1.0
*/
snow4.canvas = snow4.canvas || {};
snow4.chart = snow4.chart || {};

(function(d3, S) {
  S.canvas.colorbar = function() {
    var scale
    var width = 200
    var height = 20
    var chart = function(selection) {
      console.log(selection)
      var canvas = selection.selectAll("canvas").data([1])
      canvas.exit().remove();
      canvas.enter().append("canvas")
      .merge(canvas)
      .attr("height", height + 40)
      .attr("width", width + 40)
      //console.log("canvas",canvas)

      var ctx = selection.selectAll("canvas").node().getContext("2d");
      var grd=ctx.createLinearGradient(0,0,width+20,0);
      grd.addColorStop(0,scale.range()[0]);
      grd.addColorStop(1,scale.range()[1]);
      ctx.fillStyle=grd;
      ctx.fillRect(20,20,width,height);

    }
    chart.scale = function(d) {
      if (!arguments.length) {
        return scale
      }
      else {
        scale = d
        return chart;
      }
    }
    chart.width = function(d) {
      if (!arguments.length) {
        return width
      }
      else {
        width = d
        return chart;
      }
    }
    chart.height = function(d) {
      if (!arguments.height) {
        return width
      }
      else {
        width = d
        return chart;
      }
    }
    return chart
  }


  S.canvas.matrix = function() {
    var foldLevel = 0
    var id = "noname"
    var send = function(x) {
      console.log(x);
    }
    var cellSize = 1;
    var data = {}
    var scaled = false;
    var color = d3.scaleLinear().range(["green", "white", "red"]).domain([-0.1, 0, 0.1])
    var xScale
    var yScale
    var chart = function(selection) {
      var self = selection;
      var xLen = function() {
        return data.length;
      };
      var yLen = function() {
        return data[0].length;
      }
      var niceScale = function() {
        var max = data[0][0]
        var min = data[0][0]
        data.forEach(function(row) {
          row.forEach(function(d) {
            if (d > max) {
              max = d
            }
            if (d < min) {
              min = d
            }
          })
        })
        if (min > -1e-07) {
          color.range(["white", "red"]).domain([0, max])
        }
        else {
          color.range(["green", "white", "red"]).domain([min, 0, max])
        }
      }
      if (!scaled) {
        niceScale()
      }
      var controlDiv = self.append("div").attr("class","ctrl")
      var canvasDiv = self.append("div").attr("class","canvasdiv")
      var canvas = canvasDiv.append("canvas")
      .attr("width", xLen() * cellSize)
      .attr("height", yLen() * cellSize)
      .style("position", "absolute")
      var ctx = canvas.node().getContext("2d");
      for (var x = 0; x < xLen(); x++) {
        for (var y = 0; y < yLen(); y++) {
          ctx.fillStyle = color(data[x][y]);
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }


      var svg = self.append("svg")
      //console.log("svg")
      svg.attr("width", xLen() * cellSize).attr("height", yLen() * cellSize)
      .style("position", "absolute")

      //svg.exit().remove()
      var fc = Math.pow(2, foldLevel);
      yScale = d3.scaleLinear().domain([0, yLen()*fc]).range([0, yLen() * cellSize])
      xScale = d3.scaleLinear().domain([0, xLen()*fc]).range([0, xLen() * cellSize])
      var brushCb = function() {
        var e = d3.event.selection
        var extent = [
          e[0].map(xScale.invert),
          e[1].map(yScale.invert)
        ];
        //console.log(d3.event.selection)
        //console.log("extent",d3.event.selection)

        send({"extent":extent,"cellSize":cellSize,"xLen":xLen()*fc,"yLen":yLen()*fc});
      }
      var brush = d3.brush().on("brush", brushCb);
      svg.call(brush)

    }
    /**STILL TEST  canvas processing for codes , need to be formalized**/
    chart.process = function(code) {
      var svg = d3.select(this).selectAll("svg")
      var rect = svg.selectAll(".code").data(code)
      rect.enter().append("rect").attr("class","code")
      rect
      .attr("x",function(d){ return xScale(d.x)})
      .attr("y",function(d){ return yScale(d.y)})
      .attr("width",function(d){ return xScale(d.width)})
      .attr("height",function(d){ return yScale(d.height)})
      .attr("fill",function(d){
        if (d.color){
          return d.color
        } else {
          return "yellow"
        }
      })
      .attr("opacity",0.5)
      rect.exit().remove()
    }
    chart.domain = function(d) {
      if (!arguments.length) {
        return color.domain()
      }
      else {
        color.domain(d)
        scaled = true;
        return chart;
      }
    }
    chart.range = function(d) {
      if (!arguments.length) {
        return color.range()
      }
      else {
        color.range(d)
        return chart;
      }
    }
    chart.color = function(d) {
      if (!arguments.length) {
        return color
      }
      else {
        color = d
        return chart;
      }
    }
    var logscale;
    chart.logscale = function(x) {
      if (!arguments.length) {
        return logscale;
      }
      logscale = x;
      var domain = color.domain()
      var range = color.range()
      if (x==true) {
        var pdomain=[]
        domain.forEach(function(d){pdomain.push(d+1.0)})
        var c = d3.scaleLog().domain(pdomain).range(range)
        color = function(d) {
          if(d<0.0) {
            return c(1.0)
          } else {
            return c(d+1.0)
          }
        }
        color.domain = function(x) {
          if (!arguments.length) {
            return domain
          } else {
            var pdomain=[]
            domain = x
            x.forEach(function(d){pdomain.push(d+1.0)})
            c.domain(pdomain)
          }
        }
        color.range = function(d) {
          if (!arguments.length) {
            range
          } else {
            c.range(d)
          }
        }
      } else {
        var domain = color.domain()
        var range = color.range()
        color=d3.scaleLinear().domain(domain).range(range)
      }
      return chart
    }
    chart.send = function(f) {
      if (!arguments.length) {
        return send
      }
      else {
        send = f;
        return chart;
      }
    }
    chart.cellSize = function(x) {
      if (!arguments.length) {
        return cellSize;
      }
      else {
        cellSize = x;
        return chart;
      }
    }
    chart.id = function(x) {
      if (!arguments.length) {
        return id;
      }
      else {
        id = x;
        return chart;
      }
    }
    chart.foldLevel = function(x) {
      if (!arguments.length) {
        return foldLevel;
      }
      else {
        foldLevel = x;
        return chart;
      }
    }
    chart.data = function(x) {
      if (!arguments.length) {
        return data;
      }
      else {
        data = x;
        return chart;
      }
    }
    return chart;
  }


  S.chart.matrix = function() {
    var layout = function(data) {
      var retv = {}
      retv.mat = []
      retv.labels = []
      var header = data.shift();
      data.forEach(function(d) {
        if (d.length > 1) {
          retv.labels.push(d.shift());
          retv.mat.push(d);
        }
      })
      return retv;
    }
    var width = 700
    var height = 700
    var pluginName = "mat"
    var send = function(d) {
      console.log(d)
    }
    var dbname ;　
    var codes=[];
    var id = "noname"
    var data
    var fL = 0;
    var cellSize = 1
    var figSize = 400
    var size;
    var data, matrix, domain, RC;
    var color1 = "#FFFFFF", color2 = "#FF0000", logChecked = true
    var dims;
    var chart = function(selection) {
      var row = selection;
      row.selectAll("*").remove(); //TODO
      var self = row.append("div").style("height", height+"px").style("width",width+"px").style("overflow", "scroll")

	  /*
      var header = self.selectAll(".box_header").data([id])
      header.enter().append("div")
      .attr("class", "box-header with-boarder")
      header.exit().remove()
      header.append("h3").attr("class", "box-title").html("<i class='fa fa-file'></i>  "+ id);
      */
	  //var header = self.append("h3").classed("header",true).text(function(d){return d})

      var simple_render = function() {
        var wait = self.selectAll(".overlay").append("div").attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        var cb = function() {
          wait.remove();
        }

        self.selectAll(".body").remove();
        var c = self.append("div").attr("class", "body")
        console.log("body",c);
        var colorbar = S.canvas.colorbar().scale(
          d3.scaleLinear()
          .domain(domain)
          .range([color1,color2])
        )

        var dColorbar = c.append("div").attr('class','colorbar').call(colorbar)

        var infodiv = c.append("div").attr('class',"infodiv")
          if (cellSize==1) {p=""} else {p="s"}

        infodiv.text("each cell width is "+ cellSize + " pixel"+p+" and represents " + Math.pow(2,fL) + " data point"+p+".")
        var m = c.append("div").attr("class","mat")


        var mat = S.canvas.matrix()
        .cellSize(cellSize)
        .id(id)
        .data(matrix)
        .foldLevel(fL)
        .send(send)
        .domain(domain)
        .range([color1, color2])
        .logscale(logscale)
        m.call(mat)
        cb();
      }


      var render = function() {
        var wait = self.append("div").attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        d3.text("/get/"+dbname + "/" + id + "/"+ pluginName + "/"+"mat"+fL, function(tsv) {
          data = d3.tsvParseRows(tsv)
          matrix = layout(data).mat;
          wait.remove();
          simple_render()
        })
      }
      var setRC = function(rc) {
        fL = 0
        RC = rc;
        var r = rc[0]
        var c = rc[1]
        console.log('rc', rc)
        size = Math.max(r, c)
        var l = size
        var level = 0;
        while (1) {
          if (l < figSize) {
            cellSize = Math.floor(figSize / l)
            break;
          }
          else {
            l = l / 2
            fL += 1
          }
        }
      }
      var setDomain = function(r) {
        domain = r;
      }
      var ready = function(error, results) {
        if (error) throw error;
        setRC(results[0])
        setDomain(results[1])
        //initInfo();
        render()
      }
      d3_queue.queue(2)
      .defer(
        d3.json, "/get/"+dbname+"/" + id +"/"+pluginName+"/dims"
      )
      .defer(d3.json, "/get/"+dbname+"/" + id +"/"+pluginName+"/domain").awaitAll(ready)

    }
    chart.process = function(d) {
      var p = mat.process(d) //local scale for mat
    }


    chart.send = function(d) {
      if (!arguments.length) {
        return send
      }
      else {
        send = d
        return chart;
      }
    }
    chart.id = function(d) {
      if (!arguments.length) {
        return id
      }
      else {
        id = d
        return chart;
      }
    }
    chart.width = function(d) {
      if (!arguments.length) {
        return width
      }
      else {
        width = d
        return chart;
      }
    }
    chart.height = function(d) {
      if (!arguments.length) {
        return height
      }
      else {
        height = d
        return chart;
      }
    }
    chart.figSize = function(d) {
      if (!arguments.length) {
        return figSize
      }
      else {
        figSize = d
        return chart;
      }
    }
    chart.fL = function(d) {
      if (!arguments.length) {
        return fL
      }
      else {
        fL = d
        return chart;
      }
    }
    chart.cellSize = function(d) {
      if (!arguments.length) {
        return cellSize
      }
      else {
        cellSize = d
        return chart;
      }
    }
    chart.dbname = function(d) {
      if (!arguments.length) {
        return dbname
      }
      else {
        dbname = d
        return chart;
      }
    }
    chart.color1 = function(d) {
      if (!arguments.length) {
        return color1
      }
      else {
        color1 = d
        return chart;
      }
    }
    chart.color2 = function(d) {
      if (!arguments.length) {
        return color2
      }
      else {
        color2 = d
        return chart;
      }
    }
    var logscale = true;
    chart.logscale = function(d) {
      if (!arguments.length) {
        return logscale
      }
      else {
        logscale = d
        return chart;
      }
    }
    return chart
  }
}(d3, snow4))
