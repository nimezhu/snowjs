package snowjs

//go:generate go-bindata-assetfs -pkg snow static/...

/* VERSION 0.0.1 Host Libraries:
 * lib/
 *     angular.min.js
 *	   bootstrap.min.js
 *     d3.v3.min.js
 *     list.min.js
 *	   app.min.js
 *     d3-queue.v2.min.js
 *     jquery.min.js
 * css/
 *    AdminLTE.min.css
 *    bootstrap.min.css
 *    skin-black.min.css
 * fonts/
 *  glyphicons-halflings-regular.eot
 *	glyphicons-halflings-regular.woff
 *	glyphicons-halflings-regular.svg
 *	glyphicons-halflings-regular.woff2
 *	glyphicons-halflings-regular.ttf
 */

import (
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	VERSION = "0.0.1"
)

func CssHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/css")
	ps := mux.Vars(r)
	bytes, err := Asset("static/css/" + ps["file"])
	if err != nil {
		log.Println(err)
	}
	io.WriteString(w, string(bytes))
}
func JsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/JavaScript")
	ps := mux.Vars(r)
	bytes, err := Asset("static/lib/" + ps["file"])
	if err != nil {
		log.Println(err)
	}
	io.WriteString(w, string(bytes))
}

func FontHandler(w http.ResponseWriter, r *http.Request) {
	ps := mux.Vars(r)
	bytes, err := Asset("static/fonts/" + ps["file"])
	if err != nil {
		log.Println(err)
	}
	io.WriteString(w, string(bytes))
}

func AddHandlers(router *mux.Router, root string) error {
	if root == nil {
		root = ""
	}
	router.HandleFunc(root+"/lib/{file}", JsHandler)
	router.HandleFunc(root+"/css/{file}", CssHandler)
	router.HandleFunc(root+"/fonts/{file}", FontHandler)
	return nil
}
