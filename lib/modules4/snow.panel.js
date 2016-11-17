var snow4 = snow4 || {};
/*   name snow.panel
*   version 0.0.1
*   dependency: S.tools , S.config, S.chart
*   panel, contain chart and config.
*/
(function(S,d3) {
  S.panel = S.panel || {};

  S.panel.general = function(cb) {
    var ViewPane,CfgPane;
    var Content;
    var NavTabs;
    var NavView,NavCfg;
    var Config =　S.config();
    var Div;
    //var Uid;
    var Title = ""
    var chart;
    var config;

    /*
    var configDemo = {
      "x":{"d":1,"t":"i","v":1},
      "y":{"d":2,"t":"i","v":2},
      "z":{"d":6,"t":"i","v":6},
      "xScaleType":{"d":"linear","t":"s","o":["linear","log","category"],"v":"linear"},
      "yScaleType":{"d":"linear","t":"s","o":["linear","log","category"],"v":"linear"},
      "zScaleType":{"d":"category","t":"s","o":["linear","log","category"],"v":"category"}
    }
    */
    var initView = false


    var panel = function(selection) {
      var Uid;
      console.log("in panel");
      //Ctrl = selection.append("div").attr("class","box-header").text("Ctrl")
      //Div = selection.append("div").attr("class","nav-tabs-custom")
      console.log(selection);
      Div = selection
      Div.classed("nav-tabs-custom",true)
      //NavTabs = Div.selectAll("ul").data([{}])
      NavTabs = Div.append("ul")
      /*
      NavTabs.enter().append("ul")
      .merge(NavTabs)
      */
      .classed("nav",true)
      .classed("nav-tabs",true)
      .classed("pull-right",true)
      //.text(function(d){return d})
      var title = NavTabs.selectAll(".header").data([{}])
      var Uid = S.tools.randomString(8);
      title.enter()
      .append("li")
      .classed("header",true)
      .classed("pull-left",true)
      .html(Title)

      NavCfg = NavTabs.append("li").classed("cfg",true).classed("active",false)
      NavCfg.append("a")
      .attr("href","#"+Uid+"_cfg")
      .attr("data-toggle","tab")
      .text("Config")

      NavView = NavTabs.append("li")
      .classed("view",true)
      .classed("active",true)
      NavView.append("a")
      .attr("href","#"+Uid+"_view")
      .attr("data-toggle","tab")
      .text("View")
      Content = Div.append("div").attr("class","tab-content")
      ViewPane = Content.append("div").attr("class","tab-pane").classed("view",true).attr("id",Uid+"_view")
      .classed("active",true)
      CfgPane = Content.append("div").attr("class","tab-pane").classed("cfg",true).attr("id",Uid+"_cfg")
      .classed("active",false)

      if (initView) {
        var wait = ViewPane.append("div")
        .attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        ViewPane.call(chart)
        wait.remove()
      }
      var core = function(data){
        var keys = Object.keys(data)
        keys.forEach(function(d){
          chart[d](data[d].v)
        })

        var wait = ViewPane.append("div")
        .attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
        ViewPane.call(chart)
        wait.remove()
        NavView.classed("active",true)
        NavCfg.classed("active",false)
        CfgPane.classed("active",false)
        ViewPane.classed("active",true)

      }
      Config.data(config).callback(core)
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
      var wait = ViewPane.append("div")
      .attr("class", "overlay")
      .append("i")
      .attr("class", "fa fa-refresh fa-spin")
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
      var wait = ViewPane.append("div")
      .attr("class", "overlay").append("i").attr("class", "fa fa-refresh fa-spin")
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
}(snow4,d3))
