cat snow.tools.js\
    snow.tsv.js\
    snow.config.js\
    snow.panel.js\
    snow.chart.*.js\
    > snow.js

minify snow.js > ../../static/lib/snow.min.js
rm snow.js
cd ../../
go generate
cd -
