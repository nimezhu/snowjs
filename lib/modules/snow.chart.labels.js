var snow = snow || {};
snow.chart = snow.chart || {};
/* name : snow.chart.labels
* version : 0.0.1
*          render tsv cols labels.
*/
(function(S,d3){
  S.chart.labels = function() {
    var data
    var send // when click ， callback
    var ul
    var chart = function(selection) {
      ul = selection.selectAll("ul").data([0])
      ul.exit().remove()
      ul.enter().append("ul").attr("class","list")
      var li = ul.selectAll("li").data(data.table.cols)
      li.exit().remove()
      li.enter().append("li")
      li.text(function(d,i){
        return i+" "+d.label
      })
      li.on("click", function(d,i){
        send({"i":i,"label":d})
      })
      ;
    }
    chart.ul = function() {
      return ul //set ul attr interface
    }
    chart.send = function(x) {
      if(!arguments.length) {
        return data
      }
      else {
        data=x;
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
    return chart
  }
}(snow,d3))
