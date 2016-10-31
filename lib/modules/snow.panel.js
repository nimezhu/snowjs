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
  	var Uid;
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
  		Uid = S.tools.randomString(8);
  		//Ctrl = selection.append("div").attr("class","box-header").text("Ctrl")
  		//Div = selection.append("div").attr("class","nav-tabs-custom")
		Div = selection
  		Div.classed("nav-tabs-custom",true)
		NavTabs = Div.append("ul").attr("class","nav nav-tabs pull-right")
		Title = NavTabs.append("li").html(Title).classed("pull-left",true).classed("header",true)
  		
  		NavCfg = NavTabs.append("li")
  		NavCfg.append("a").attr("href","#"+Uid+"_cfg").attr("data-toggle","tab").text("Config")
		NavView = NavTabs.append("li").classed("active",true)
  		NavView.append("a").attr("href","#"+Uid+"_view").attr("data-toggle","tab").text("View")
  		Content = Div.append("div").attr("class","tab-content")
  		ViewPane = Content.append("div").attr("class","tab-pane active").attr("id",Uid+"_view")
  		CfgPane = Content.append("div").attr("class","tab-pane").attr("id",Uid+"_cfg")
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
						console.log('in parse indexes')
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
}(snow,d3))
