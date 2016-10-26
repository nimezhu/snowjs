var snow = snow || {};
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
  	var Div;
  	var Uid
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
  		Uid = S.tools.randomString(8);
  		//Ctrl = selection.append("div").attr("class","box-header").text("Ctrl")
  		Div = selection.append("div").attr("class","nav-tabs-custom")
  		NavTabs = Div.append("ul").attr("class","nav nav-tabs")
  		NavView = NavTabs.append("li").classed("active",true)
  		NavView.append("a").attr("href","#"+Uid+"_view").attr("data-toggle","tab").text("View")
  		NavCfg = NavTabs.append("li")
  		NavCfg.append("a").attr("href","#"+Uid+"_cfg").attr("data-toggle","tab").text("Config")
  		Content = Div.append("div").attr("class","tab-content")
  		ViewPane = Content.append("div").attr("class","tab-pane active").attr("id",Uid+"_view")
  		CfgPane = Content.append("div").attr("class","tab-pane").attr("id",Uid+"_cfg")
  		//ViewPane.call(chart)
  		if (initView) {
  			ViewPane.call(chart)
  		}
  		var core = function(data){
  			var keys = Object.keys(data)
  			keys.forEach(function(d){
  				chart[d](data[d].v)
  			})

  			ViewPane.call(chart)
  			NavView.classed("active",true)
  			NavCfg.classed("active",false)
  			CfgPane.classed("active",false)
  			ViewPane.classed("active",true)
  		}
  		var ChartA = S.config().data(config).callback(core)
  		CfgPane.call(ChartA)
  	}
      panel.ViewPane = function() {
  		return ViewPane
  	}

  	panel.update = function(selection){
  		ViewPane.call(chart)
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
  					chart[d](config[d].v)
  				} else {

  				  chart[d](config[d].d)
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
  	return panel
  }
}(snow,d3))
