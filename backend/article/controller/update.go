package controller

import (
	"fmt"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/base"
)

// Update
func (con Controller) Update(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var newMap interface{}

	err := ctx.JSONBody(&newMap)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	mp, ok := newMap.(map[string]interface{})
	if !ok {
		log.Error("Error In JSONBody:", newMap)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	v, ok := mp["aid"]

	if !ok || v.(int) < 0 {
		log.Error("Error In JSONBody:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	err = con.db.UpdateArticle(v.(int), toKeyValStr(mp))
	if err != nil {
		log.Error("Error In Mysql UpdateArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func toKeyValStr(mp map[string]interface{}) string {
	str := ""
	for k, v := range mp {
		str += fmt.Sprintf(", %s=%v", k, v)
	}

	if len(str) > 0 {
		return str[1:]
	}

	return str
}
