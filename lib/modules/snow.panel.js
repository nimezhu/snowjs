var snow = snow || {};
/*   name snow.panel
*   version 0.0.1
*   dependency: S.tools , S.config, S.chart
*   panel, contain chart and config.
*/
(function(S,d3) {
  S.panel = S.panel || {};
  S.tools = S.tools || {};

  S.tools.ParseIndexes = function(s){ //standard 1-index , compatible with cut
    var k= s.split(",")
    var a=[];
    for (var i=0;i<k.length;i++) {
      var b = k[i].split("-")
      if (b.length==2) {
        for (var j=parseInt(b[0]);j<=parseInt(b[1]);j++) {
          a.push(j)
        }
      } else {
        a.push(parseInt(b[0]))
      }
    }
    return a
  }
  S.panel.general = function(cb) {
    var ViewPane,CfgPane;
    var Content;
    var NavTabs;
    var NavView,NavCfg;
    var Config;
    var Div;
    //var Uid;
    var Title = ""
    var chart;
    var config;
    var configDemo = {
      "x":{"d":1,"t":"i","v":1},
      "y":{"d":2,"t":"i","v":2},
      "z":{"d":6,"t":"i","v":6},
      "xScaleType":{"d":"linear","t":"s","o":["linear","log","category"],"v":"linear"},
      "yScaleType":{"d":"linear","t":"s","o":["linear","log","category"],"v":"linear"},
      "zScaleType":{"d":"category","t":"s","o":["linear","log","category"],"v":"category"}
    }
    var initView = false


    var panel = function(selection) {
      var Uid;
      //Ctrl = selection.append("div").attr("class","box-header").text("Ctrl")
      //Div = selection.append("div").attr("class","nav-tabs-custom")
      Div = selection
      Div.classed("nav-tabs-custom",true)
      NavTabs = Div.selectAll("ul").data([{}])
      NavTabs.enter().append("ul")
      NavTabs.attr("class","nav nav-tabs pull-right")
      //NavTabs.selectAll("li").remove();
      var title = NavTabs.selectAll(".header").data([{}])
      title.enter().append("li").attr("uid",function(d){
        return S.tools.randomString(8);
      })
      title.html(Title).classed("pull-left",true).classed("header",true)
      var Uid = title.attr("uid")
      NavCfg = NavTabs.selectAll(".cfg").data([{}])
      NavCfg.enter().append("li").classed("cfg",true)
      NavCfg.selectAll("a").data([{}])
      .enter()
      .append("a")
      .attr("href","#"+Uid+"_cfg")
      .attr("data-toggle","tab")
      .text("Config")
      NavCfg.classed("active",false)

      NavView = NavTabs.selectAll(".view").data([{}]).enter().append("li").classed("view",true)
      NavView.classed("active",true)
      NavView.selectAll("a").data([{}]).enter().append("a").attr("href","#"+Uid+"_view").attr("data-toggle","tab").text("View")

      Content = Div.selectAll(".tab-content").data([{}]).enter().append("div").attr("class","tab-content")
      ViewPane = Content.selectAll(".view").data([{}]).enter().append("div").attr("class","tab-pane").classed("view",true).attr("id",Uid+"_view")
      ViewPane.classed("active",true)
      CfgPane = Content.selectAll(".cfg").data([{}]).enter().append("div").attr("class","tab-pane").classed("cfg",true).attr("id",Uid+"_cfg")
      CfgPane.classed("active",false)
      //ViewPane.call(chart)
      if (initView) {
        var wait = ViewPane.selectAll(".overlay").data([0])
        wait.enter().append("div")
        wait.attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        wait.exit().remove();
        ViewPane.call(chart)
        wait.remove()
      }
      var core = function(data){
        var keys = Object.keys(data)
        keys.forEach(function(d){
          chart[d](data[d].v)
        })
        var wait = ViewPane.selectAll(".overlay").data([0])
        wait.enter().append("div")
        wait.attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        wait.exit().remove();
        ViewPane.call(chart)
        wait.remove()
        NavView.classed("active",true)
        NavCfg.classed("active",false)
        CfgPane.classed("active",false)
        ViewPane.classed("active",true)
      }
      Config = S.config().data(config).callback(core)
      CfgPane.call(Config)
    }
    panel.ViewPane = function() {
      return ViewPane
    }
    panel.CfgPane = function() {
      return CfgPane
    }
    panel.UpdateConfig = function() {
      Config.data(config)
      if (CfgPane) {
        CfgPane.call(Config)
      }
    }

    panel.update = function(selection){
      var wait = ViewPane.selectAll(".overlay").data([0])
      wait.enter().append("div")
      wait.attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
      wait.exit().remove();
      ViewPane.call(chart)
      wait.remove()
    }
    panel.chart = function(x) {
      if(!arguments.length) {
        return chart
      }
      else {
        chart=x;
        return panel;
      }
    }
    panel.config = function(x) {
      if(!arguments.length) {
        return config
      }
      else {
        config=x;
        var keys = Object.keys(config)
        keys.forEach(function(d){
          if (config[d].v!=undefined) {
            if (config[d].t == "index" && typeof config[d].v === "string") {
              chart[d](S.tools.ParseIndexes(config[d].v))
            }
            else {
              chart[d](config[d].v)
            }
          } else {
            if (config[d].t == "index" && typeof config[d].d === "string" ) {
              chart[d](S.tools.ParseIndexes(config[d].d))
            }
            else {
              chart[d](config[d].d)
            }
          }
        })
        return panel;
      }
    }

    panel.initView = function(x) {
      if(!arguments.length) {
        return initView
      }
      else {
        initView=x;
        return panel;
      }
    }
    panel.Title = function(x) {
      if(!arguments.length) {
        return Title
      }
      else {
        Title=x;
        return panel;
      }
    }
    return panel
  }

  S.panel.box = function(cb) {
    var ViewPane
    var Div;
    var Uid;
    var Title = ""
    var chart;
    var config;
    var initView = false
    var panel = function(selection) {
      Uid = S.tools.randomString(8);
      Div = selection
      Div.classed("box",true)
      Div.append("div").classed("box-header",true).append("h3").classed("box-title",true).text(Title)
      ViewPane = Div.append("div").classed("box-body",true).attr("id",Uid+"_view")
      ViewPane.call(panel.update)

    }
    panel.ViewPane = function() {
      return ViewPane
    }
    panel.update = function(selection){
      var wait = ViewPane.selectAll(".overlay").data([0])
      wait.enter().append("div")
      wait.attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
      wait.exit().remove();
      ViewPane.call(chart)
      wait.remove()
    }
    panel.chart = function(x) {
      if(!arguments.length) {
        return chart
      }
      else {
        chart=x;
        return panel;
      }
    }
    panel.config = function(x) {
      if(!arguments.length) {
        return config
      }
      else {
        config=x;
        var keys = Object.keys(config)
        keys.forEach(function(d){
          if (config[d].v!=undefined) {
            if (config[d].t == "index" && typeof config[d].v === "string") {
              chart[d](S.tools.ParseIndexes(config[d].v))
            }
            else {
              chart[d](config[d].v)
            }
          } else {
            if (config[d].t == "index" && typeof config[d].d === "string" ) {
              chart[d](S.tools.ParseIndexes(config[d].d))
            }
            else {
              chart[d](config[d].d)
            }
          }
        })
        return panel;
      }
    }
    panel.Title = function(x) {
      if(!arguments.length) {
        return Title
      }
      else {
        Title=x;
        return panel;
      }
    }
    return panel
  }
}(snow,d3))
