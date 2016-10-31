var snow = snow || {};
/*   name snow.config
 *   version 0.0.1
 *   config pane for panel.
 */
(function(S,d3) {
  S.config = function() {
    var data;
    var typeMap = {
      "i":"number",
      "a":"text",  // example : 1,2,3
      "s":"text",
      "f":"text",
      "index":"text",
      "color":"color",
      "bool":"checkbox"
    }
    var parseMap = {
      "i":function(s) { return parseInt(s.value)},
      "f":function(s) { return parseFloat(s.value)},
      "s":function(s){return s.value},
      "a":function(s){return
        JSON.parse("["+s.value+"]")},
      "index":function(s){
        return S.tools.ParseIndexes(s.value)
      },
      "color":function(s){return s.value},
      "bool":function(d){
        return d.checked
      }
    }
    var callback = function(d) {
      console.log("callback",d)
    }
    var chart = function(selection) {
      var tab = selection.selectAll(".table").data([data])
      tab.exit().remove()
      tab.enter().append("table").attr("class","table table-striped table-border")
      var keys = Object.keys(data)
      var th = tab.selectAll("th").data(["key","value"])
      th.enter().append("th").text(function(d){return d})
      var tr = tab.selectAll("tr").data(keys)
      tr.exit().remove()
      tr.enter().append("tr")
      var tk = tr.selectAll(".k").data(function(d){return　[d]})
      tk.enter().append("k").classed("k",true)
      tk.exit().remove()
      tk.text(function(d){return d})
      var tv = tr.selectAll(".v").data(function(d){return　[d]})
      tv.enter().append("td").classed("v",true)
      tv.exit().remove()
      var ti = tv.selectAll("input").data(function(d){
        if (data[d].o || data[d].m) { //add multi check boxes
          return []
        }	else {
          return [d]
        }
      })

      ti.exit().remove()
      ti.enter().append("input")
      ti.attr("type",function(d){
        var type = data[d].t
        return typeMap[type]
      })
      ti.attr("value",function(d){
        if (data[d].v!=undefined) {
          return data[d].v
        }
        return data[d].d
      })
      ti.property("disabled",function(d){
        if (data[d].disabled) {
          return data[d].disabled
        }
        return false
      })
      var tc = tv.selectAll("input[type='checkbox']") //for checkbox init
      tc.property("checked",function(d){
        if (data[d].v == undefined) {
          return data[d].d
        }
        return data[d].v
      })
      ti.on("change",function(d){
        var f = parseMap[data[d].t]
        data[d].v=f(this)
      })
      var ts = tv.selectAll("select").data(function(d){
        if (data[d].o) {
          return [d]
        }	else {
          return []
        }
      })
      ts.exit().remove()
      ts.enter().append("select")
      var to = ts.selectAll("option").data(function(d){
        return data[d].o
      })
      to.enter().append("option")
      to.attr("value",function(d){return d})
      to.text(function(d){return d})
      to.property("selected",function(d,i){
        var node = d3.select(this.parentNode).datum()
        if (d==data[node].d) {
          return true
        } else {
          return false
        }
      })
      to.exit().remove()
      ts.on("change",function(d){
        //console.log("on change options",d, this.value)
        var f = parseMap[data[d].t]
        //console.log(f)
        data[d].v=f(this)
      })

      var tm = tv.selectAll("div").data(function(d){
        if (data[d].m) {
          return [d]
        }	else {
          return []
        }
      })
      tm.exit().remove()
      tm.enter().append("div")
      var tclist = tm.selectAll(".checklist").data(function(d){ //tc for checkbox
        return data[d].m //default for selections.
      })
      tclist.exit().remove()
      tclist.enter().append("div").attr("class","checklist")
      tclist.selectAll("input").remove();
      var checkboxs = tclist.append("input")
      .attr("type","checkbox")
      .attr("value",function(d){return d3.select(this.parentNode).datum()})
      checkboxs.filter(function(d){
        var d = d3.select(this.parentNode).datum();
        var k = d3.select(this.parentNode.parentNode).datum()
        var v = data[k].v
        //console.log(d,k,v)
        for(var i=0;i<v.length;i++){
          if (v[i]===d) {
            return true
          }
        }
        return false
      }).property("checked",true)

      tclist.selectAll("text").remove();
      tclist.append("text").text(function(d){return d})

      var button = selection.selectAll("button").data(["submit"])
      button.enter().append("button")
      button.text("submit")
      button.on("click",function(e){
        tm.attr("clean",function(d){
          console.log("clean",d)
          data[d].v=[]
        })
        tclist.selectAll('input:checked').attr("selected",function(d){
          var key = d3.select(this.parentNode.parentNode).datum()
          data[key].v.push(d)
        })
        callback(data)
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
    chart.callback = function(x) {
      if(!arguments.length) {
        return callback
      }
      else {
        callback=x;
        return chart;
      }
    }
    return chart

  }
}(snow,d3))
