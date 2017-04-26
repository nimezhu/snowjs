{{define "libcss"}}
 <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
  <script src="/lib/d3.{{.D3}}.min.js"></script>
  <script src="/lib/d3-dispatch.v1.min.js"></script>
 {{template "lib"}}
 <script>if (window.module) module = window.module;</script>

 {{template "css"}}
{{end}}
