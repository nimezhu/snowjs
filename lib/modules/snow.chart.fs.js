var snow = snow || {};
snow.chart = snow.chart || {};
(function(S,d3){
	S.chart.fs = function() {
		var pwd=""
		var prefix = "/f/"
		var callback = function(d) {
			console.log(d)
		}
		var chart = function(selection) {
			selection.classed("box-info",true)

			var Pwd = selection.selectAll(".pwd").data([pwd])
			Pwd.enter().append("div").classed("pwd",true)
			var BtnDiv=selection.selectAll(".btndiv").data([{}])
			BtnDiv.enter().append("div").classed("btndiv",true)
			var ul = selection.selectAll("ul").data([{}])
			ul.enter().append("ul")
			var ls = function(dir) {
				pwd = dir
				Pwd.html(dir)
				d3.json(prefix + dir, function(d) {
					var li = ul.selectAll("li").data(d)
					li.enter().append("li")
					li.html(function(d) {
						if (d.IsDir) {
							return '<a><i class="fa fa-folder-o"></i> ' + d.Name+"</a>"
						}
						else {
							return '<a><i class="fa fa-file-o"></i> ' + d.Name+"</a>"
						}
					})
					li.on("click", function(d) {
						if (d.IsDir) {
							ls(pwd + "/" + d.Name)
						}
						else {
							callback({
								"method":"POST",
								"data":JSON.stringify({
									file: pwd + "/" + d.Name
								})
							})
						}
					})
					li.exit().remove()

				})
			}
			var buttons = [{"txt":"up","func":function() {
				let p = pwd.split("/")
				let dir = pwd;
				if (p.length > 0) {
					p.pop()
					dir = p.join("/")
				}
				ls(dir)
			}
		},
			{
				"txt":"root",
			 "func": function() {
				ls("")
			}
		}
		]
			var Btns =  BtnDiv.selectAll("button").data(buttons)
			Btns.enter().append("input").attr("type","button")
			Btns.attr("value",function(d){return d.txt})
					.text(function(d){return d.txt})
			Btns.on("click",function(d){
				d.func()
			})
		  ls(pwd)
	  }
		chart.prefix = function(x) {
			if (!arguments.length) {
				return prefix
			} else {
				prefix=x
				return chart
			}
		}
		chart.callback = function(x) {
			if (!arguments.length) {
				return callback
			} else {
				callback=x
				return chart
			}
		}
		return chart
	}
}(snow,d3))

