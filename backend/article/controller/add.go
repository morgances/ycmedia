package controller

import (
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/article/mysql"
	"github.com/morgances/ycmedia/backend/base"
)

/*
{
	"user_id": 123,
	"category": 2,
	"tag": 3,
	"label": 0,
	"title": "asdasd",
	"author": "asdwe",
	"date": "this is time",
	"image": "asdbakjscx",
	"text": "asd"
}
*/
func (con Controller) Add(ctx *server.Context) error {
	var x mysql.Article
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Info("In AddArticle:", x)

	err = con.db.AddArticle(x.Category, x.Tag, x.Label, x.Uid, x.Title, x.Author, x.Image, x.Text, x.Date)
	if err != nil {
		log.Error("Error In Mysql.AddArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
