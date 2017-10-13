package snowjs

import (
	"fmt"
	"io"
	"net/http"
	"path"
	"regexp"
	"strings"
)

func cssI(w http.ResponseWriter, file string) {
	w.Header().Add("Content-Type", "text/css")
	w.Header().Add("Vary", "Accept-Encoding")
	bytes, err := Asset("static/css/" + file)
	if err != nil {
		io.WriteString(w, "Not Found")
	} else {
		io.WriteString(w, string(bytes))
	}
}
func jsI(w http.ResponseWriter, file string) {
	w.Header().Add("Content-Type", "text/JavaScript")
	w.Header().Add("Vary", "Accept-Encoding")
	bytes, err := Asset("static/lib/" + file)
	if err != nil {
		io.WriteString(w, "Not Found")
	} else {
		io.WriteString(w, string(bytes))
	}
}

func fontI(w http.ResponseWriter, file string) {
	w.Header().Add("Vary", "Accept-Encoding")
	bytes, err := Asset("static/fonts/" + file)
	if err != nil {
		io.WriteString(w, "Not Found")
	} else {
		io.WriteString(w, string(bytes))
	}
}
func pluginI(w http.ResponseWriter, file string) {
	bytes, err := Asset("static/plugins/" + file)
	w.Header().Add("Vary", "Accept-Encoding")
	if err != nil {
		io.WriteString(w, "Not Found")
	} else {
		switch ext := path.Ext(file); ext {
		case ".css":
			w.Header().Add("Content-Type", "text/css")
			io.WriteString(w, string(bytes))
		case ".js":
			w.Header().Add("Content-Type", "text/JavaScript")
			io.WriteString(w, string(bytes))
		case ".png":
			w.Header().Add("Content-Type", "image/png")
			w.Write(bytes)
		case ".jpeg":
			w.Header().Add("Content-Type", "image/jpeg")
			w.Write(bytes)
		case ".jpg":
			w.Header().Add("Content-Type", "image/jpeg")
			w.Write(bytes)
		}
	}

}

func AddSnow(handler http.Handler, root string) http.Handler {
	if len(root) > 0 && root[0] != '/' {
		root = "/" + root
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var snowCssValid = regexp.MustCompile("^" + root + "/css")
		var snowJsValid = regexp.MustCompile("^" + root + "/lib")
		var snowFontsValid = regexp.MustCompile("^" + root + "/fonts")
		var snowPluginsValid = regexp.MustCompile("^" + root + "/plugins")
		if snowCssValid.MatchString(r.URL.Path) {
			cssI(w, strings.Replace(r.URL.Path, root+"/css/", "", 1))
		} else if snowJsValid.MatchString(r.URL.Path) {
			jsI(w, strings.Replace(r.URL.Path, root+"/lib/", "", 1))
		} else if snowFontsValid.MatchString(r.URL.Path) {
			fontI(w, strings.Replace(r.URL.Path, root+"/fonts/", "", 1))
		} else if snowPluginsValid.MatchString(r.URL.Path) {
			pluginI(w, strings.Replace(r.URL.Path, root+"/plugins/", "", 1))
		} else {
			fmt.Println("server handler router")
			handler.ServeHTTP(w, r)
		}
	})

}
