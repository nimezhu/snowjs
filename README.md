# snowjs

## Usage Example
```
import github.com/nimezhu/snowjs

func addStaticHandles(router *mux.Router) error {
	router.HandleFunc("/lib/{file}", snowjs.JsHandler)
	router.HandleFunc("/css/{file}", snowjs.CssHandler)
	router.HandleFunc("/fonts/{file}", snowjs.FontHandler)
	return nil
}
```
