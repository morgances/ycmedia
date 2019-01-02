package controller

import (
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/base"
)

/*
{
	"aid": 10
}
*/
func Delete(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Aid int `json:"aid"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In Delete: aid = %d\n", x.Aid)

	if x.Aid < 0 {
		log.Error("Error In JSONBody:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	err = conn.DeleteArticle(x.Aid)
	if err != nil {
		log.Error("Error In Mysql DeleteArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
