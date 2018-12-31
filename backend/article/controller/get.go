package controller

import (
	"net/http"
	"time"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/base"
)

/*
{
	"category": 2,
	"tag": 3,
	"page": 0
}
*/
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

	log.Infof("In GetArticleList: Category=%d, Tag=%d, Page=%d\n", x.Category, x.Tag, x.Page)

	if x.Category < 0 || x.Tag < 0 || x.Page < 0 {
		log.Error("Error In Data:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	articles, err := conn.GetArticleListDesc(x.Category, x.Tag, x.Page*10, 10, "date")
	if err != nil {
		log.Error("Error In Mysql.GetArticleList:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}

/*
{
	"aid": 10
}
*/
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

	log.Infof("In GetTextById: aid=%d\n", x.Aid)

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

	log.Infof("Get A Request For News\n")

	articles, err := conn.GetArticleOrderLimits("date", true, 0, 10)
	if err != nil {
		log.Error("Error In Mysql.GetArticleOrderLimuts:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}

/*
{
	"category": 0,
	"tag": 0,
	"date": "2018-12-30"
}
*/
func GetMore(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Category int       `json:"category"`
		Tag      int       `json:"tag"`
		Date     time.Time `json:"date"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetMore: Category=%d, Tag=%d, Date=%v\n", x.Category, x.Tag, x.Date)

	articles, err := conn.GetArticleByDate(x.Category, x.Tag, x.Date)
	if err != nil {
		log.Error("Error In Mysql.GetArticlesByDate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}
