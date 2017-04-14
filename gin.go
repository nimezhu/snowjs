package snowjs

import (
	"log"
	"path"

	"github.com/gin-gonic/gin"
)

func css(c *gin.Context) {
	c.Header("Content-Type", "text/css")
	fn := c.Param("file")
	bytes, err := Asset("static/css/" + fn)
	if err != nil {
		log.Println(err)
	}
	c.Writer.Write(bytes)
}
func js(c *gin.Context) {
	c.Header("Content-Type", "text/JavaScript")
	fn := c.Param("file")
	bytes, err := Asset("static/lib/" + fn)
	if err != nil {
		log.Println(err)
	}
	c.Writer.Write(bytes)
}

func font(c *gin.Context) {
	fn := c.Param("file")
	bytes, err := Asset("static/fonts/" + fn)
	if err != nil {
		log.Println(err)
	}
	c.Writer.Write(bytes)
}
func plugin(c *gin.Context) {
	fn := c.Param("file")
	bytes, err := Asset("static/plugins/" + fn)
	if err != nil {
		log.Println(err)
	}
	switch ext := path.Ext(fn); ext {
	case ".css":
		c.Header("Content-Type", "text/css")
		c.Writer.Write(bytes)
	case ".js":
		c.Header("Content-Type", "text/JavaScript")
		c.Writer.Write(bytes)
	case ".png":
		c.Header("Content-Type", "image/png")
		c.Writer.Write(bytes)
	case ".jpeg":
		c.Header("Content-Type", "image/jpeg")
		c.Writer.Write(bytes)
	case ".jpg":
		c.Header("Content-Type", "image/jpeg")
		c.Writer.Write(bytes)
	}

}

func AddGET(router *gin.Engine, root string) error {
	router.GET(root+"/lib/:file", js)
	router.GET(root+"/css/:file", css)
	router.GET(root+"/fonts/:file", font)
	router.GET(root+"/plugins/*file", plugin)
	return nil
}
