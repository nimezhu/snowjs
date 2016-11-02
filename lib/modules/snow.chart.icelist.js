var snow = snow || {};
snow.chart = snow.chart || {};
(function(S,d3){
S.chart.icelist = function() {
    var db;
    var send = function(d) {
      console.log(d)
    }
    var chart = function(selection) {
      var ul = selection.selectAll("ul").data([{}])
      ul.enter().append("ul")
      var list = function() {
      d3.json("/list/"+db, function(error, d){
          var lis = ul.selectAll("li").data(d);
          console.log(d)
          lis.enter().append("li")
          lis.selectAll("a").remove()
          lis.append("a").attr("class","name").text(function(d){console.log(d);return d})
          lis.on("click",function(d){
            send({"db":db,"id":d})
          })
          lis.exit().remove()

        })
      }
      list(db)
    }
    chart.db = function(x){
      if (!arguments.length) {
        return db
      } else {
        db = x;
        return chart
      }
    }
    chart.send = function(x){
      if (!arguments.length) {
        return send
      } else {
        send = x;
        return chart
      }
    }
    return chart
  }
}(snow,d3))
