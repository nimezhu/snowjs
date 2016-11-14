var snow = snow || {};
/* snow.fig
 * version 0.0.1
 */
(function(S,d3){
  S.fig = function(){
    var data = {};
    var core = function(i,d) {
      console.log("core function TODO.")
    }
    var layoutFormat = function(d) {
      return "col-md-"+d
    }
    var box = function(selection){
      selection.each(function(d,i){
        var div = d3.select(this);
        if (d.layout) {
          div.classed(layoutFormat(d.layout),true)
        } else {
          div.classed(layoutFormat(12),true)
        }
        var body = div.selectAll("div").data([0])
        body.enter().append("div")
        body.exit().remove()
        body.classed("tab-nav-custom",true)
        if (d.class) {
          d.class.forEach(function(d){
            body.classed(d,true)
          })
        }
        /*
		var header = b.append("div").classed("box-header",true).classed("with-border",true)
        if (d.title) {
          var title = header.append("h3").classed("box-title",true).text(d.title)
        }
        var body = b.append("div").classed("box-body",true)
        */
		if (d.title && d.panel) {
			if (d.panel.Title) {
				d.panel.Title(d.title)
			}
		}
		if (d.panel) {
          if (d.data) {
            body.call(d.panel)
          } else {
            body.call(d.panel)
          }
        }
      })
    }
    box.data = function(x) {
      if (!arguments.length) {return data}
      data=x;
      return box
    }
    box.core = function(x) {
      if (!arguments.length) {return core}
      core=x;
      return box
    }
    return box
  }
}(snow,d3))
