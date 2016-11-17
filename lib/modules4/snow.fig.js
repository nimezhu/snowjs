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
      selection.each(function(d,i){
        if (d.title && d.panel) {
          if (d.panel.Title) {
            d.panel.Title(d.title)
          }
          var div = d3.select(this);
          if (d.layout) {
            div.classed(layoutFormat(d.layout),true)
          } else {
            div.classed(layoutFormat(12),true)
          }
          div.selectAll("div").remove()
          var body = div.append("div")
          .classed("tab-nav-custom",true)
          .call(d.panel)
          if (d.class) {
            d.class.forEach(function(d){
              body.classed(d,true)
            })
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
}(snow4,d3))
