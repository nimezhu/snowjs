{{define "layout"}}
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>{{template "title"}}</title>
{{template "libcss" .}}
</head>
<body class="skin-black sidebar-mini">
<div class="wrapper">
  {{template "body" .}}
</div>
{{template "footer"}}
</body>
</html>
{{end}}


