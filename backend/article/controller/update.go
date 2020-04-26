package controller

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
)

// Update
func (con Controller) Update(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Println("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost.Error()))
	}

	var newMap interface{}

	err := ctx.JSONBody(&newMap)
	if err != nil {
		log.Println("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	mp, ok := newMap.(map[string]interface{})
	if !ok {
		log.Println("Error In JSONBody:", newMap)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData.Error()))
	}

	v, ok := mp["aid"]

	if !ok || int(v.(float64)) < 0 {
		log.Println("Error In JSONBody:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData.Error()))
	}

	kvs := toKeyValStr(mp)
	log.Println("In UpdateArticle:" + kvs)

	t, ok := mp["date"]
	if !ok {
		err = con.db.UpdateArticle(int(v.(float64)), kvs, nil)
	} else {
		tm, _ := time.Parse("2006-01-02T15:04:05Z", t.(string))
		err = con.db.UpdateArticle(int(v.(float64)), kvs, &tm)
	}

	if err != nil {
		log.Println("Error In Mysql UpdateArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func toKeyValStr(mp map[string]interface{}) string {
	str := ""
	for k, v := range mp {
		if k == "aid" {
			continue
		}
		if k == "date" {
			str += ", date=?"
			continue
		}
		if v == nil {
			str += fmt.Sprintf(", %s=''", k)
			continue
		}

		switch v.(type) {
		case float64:
			str += fmt.Sprintf(", %s=%v", k, v)
		default:
			str += fmt.Sprintf(", %s='%v'", k, v)
		}
	}

	if len(str) > 0 {
		return str[1:]
	}

	return str
}
