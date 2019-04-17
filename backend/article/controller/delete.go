package controller

import (
	"net/http"

	"log"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
)

/*
{
	"aid": 10
}
*/
func (con Controller) Delete(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Println("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Aid int `json:"aid"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Println("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Printf("In DeleteArticle: aid = %d\n", x.Aid)

	if x.Aid < 0 {
		log.Println("Error In JSONBody:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	err = con.db.DeleteArticle(x.Aid)
	if err != nil {
		log.Println("Error In Mysql DeleteArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
