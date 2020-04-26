package controller

import (
	"log"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
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
		log.Println("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost.Error()))
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Println("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	log.Println("In AddArticle:", "Uid: ",x.Uid,"Title: ", x.Title,"Author: ", x.Author,"Category: ", x.Category,"Tags: ", x.Tag,"Label: ", x.Label,"Image: ", x.Image,"Text: ", x.Text,"Date: ", x.Date)

	err = con.db.AddArticle(x.Uid, x.Title, x.Author, x.Category, x.Tag, x.Label, x.Image, x.Text, x.Date)
	if err != nil {
		log.Println("Error In Mysql.AddArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
