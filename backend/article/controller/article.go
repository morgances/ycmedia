package controller

import (
	"errors"
	"net/http"

	"github.com/morgances/ycmedia/backend/base"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/article/mysql"
)

var conn mysql.Database

var (
	NotPost error = errors.New("Only Receive Post !")
	NotGet  error = errors.New("Only Receive Get !")
	BadData error = errors.New("Bad Error !")
)

func init() {
	con, err := mysql.Dial()
	if err != nil {
		panic(err)
	}
	conn = con
}

// Add
func Add(ctx *server.Context) error {
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

	err = conn.AddArticle(x.Category, x.Tag, x.Uid, x.Title, x.Author, x.Image, x.Text, x.Date)
	if err != nil {
		log.Error("Error In Mysql.AddArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

// Delete
func Delete(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x interface{}
	err := ctx.JSONBody(x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	aid := x.(map[string]interface{})["aid"].(int)
	if aid <= 0 {
		log.Error("Error In JSONBody:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}
	err = conn.DeleteArticle(x.(map[string]interface{})["aid"].(int))
	if err != nil {
		log.Error("Error In Mysql DeleteArticle:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

// Get
func GetArticleList(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Category int `json:"category"`
		Tag      int `json:"tag"`
		Page     int `json:"page"`
	}
	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if x.Category < 0 || x.Tag < 0 || x.Page < 0 {
		log.Error("Error In Data:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	articles, err := conn.GetArticleListDesc(x.Category, x.Tag, x.Page*10, 10, "date")
	if err != nil {
		log.Error("Error In Mysql.GetArticleList:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if len(articles) <= 0 {
		log.Error("Error In Data:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}

func GetTextById(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotGet)
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

	if x.Aid <= 0 {
		log.Error("Error In Data:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	article, err := conn.GetArticleById(x.Aid)
	if err != nil {
		log.Error("Error In Mysql.GetArticleById:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, article))
}

func GetNews(ctx *server.Context) error {
	if ctx.Request().Method != "GET" {
		log.Error("Error In Request:", NotGet)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotGet))
	}

	articles, err := conn.GetArticleOrderLimits("date", true, 0, 10)
	if err != nil {
		log.Error("Error In Mysql.GetArticleOrderLimuts:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if len(articles) <= 0 {
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}

// Update
func Update(ctx *server.Context) error {
	return nil
}
