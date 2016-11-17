var snow4 = snow4 || {};
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

      console.log("calling fig");
      console.log(selection);
      selection.each(function(d,i){
	console.log("in ice box",d,i);
  if (d.title && d.panel) {
    if (d.panel.Title) {
      d.panel.Title(d.title)
    }
        var div = d3.select(this);
        console.log("div ice",div)
        if (d.layout) {
          div.classed(layoutFormat(d.layout),true)
        } else {
          div.classed(layoutFormat(12),true)
        }
        var body = d3.select(this).selectAll("div").data([1])
        body.exit().remove()
        body.enter().append("div")
        .merge(body)
        .classed("tab-nav-custom",true)
        .call(d.panel)
        console.log("nav body?",body)
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

		}
    /*
		if (d.panel) {
          if (d.data) {
            body.merge(body).call(d.panel)
          } else {
            body.merge(body).call(d.panel)
          }
        }
    console.log("after call body?",body)
    */
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
}(snow4,d3))
