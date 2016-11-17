cat snow.tools.js\
    snow.tsv.js\
    snow.config.js\
    snow.panel.js\
    snow.chart.*.js\
    snow.fig.js\
    > snow4.js

minify snow4.js > ../../static/lib/snow4.min.js
rm snow4.js
cd ../../
go generate
cd -
