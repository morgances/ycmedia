package controller

import (
	"net/http"
	"time"

	"github.com/morgances/ycmedia/backend/base/constants"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/base"
)

/*
{
	"category": 2,
	"tag": 3,
	"label": 0,
	"page": 0
}
*/
func (con Controller) GetArticleList(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Category int `json:"category"`
		Tag      int `json:"tag"`
		Label    int `json:"label"`
		Page     int `json:"page"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetArticleList: Category=%d, Tag=%d, Label=%d, Page=%d\n", x.Category, x.Tag, x.Label, x.Page)

	if x.Category < 0 || x.Tag < -1 || x.Label < -1 || x.Page < 0 {
		log.Error("Error In Data:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	articles, err := con.db.GetArticleListDesc(x.Category, x.Tag, x.Label, x.Page*10, 10, "date")
	if err != nil {
		log.Error("Error In Mysql.GetArticleList:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	articleCount, pageCount, err := con.db.GetArticleAndPageCount(x.Category, x.Tag, x.Label)
	if err != nil {
		log.Error("Error In Mysql.GetArticleList:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(map[string]interface{}{
		constants.RespKeyStatus: http.StatusOK,
		constants.RespKeyData:   articles,
		"articleCount":          articleCount,
		"pageCount":             pageCount,
	})
}

/*
{
	"aid": 10
}
*/
func (con Controller) GetTextById(ctx *server.Context) error {
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

	article, err := con.db.GetArticleById(x.Aid)
	if err != nil {
		log.Error("Error In Mysql.GetArticleById:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, article))
}

func (con Controller) GetNews(ctx *server.Context) error {
	if ctx.Request().Method != "GET" {
		log.Error("Error In Request:", NotGet)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotGet))
	}

	log.Infof("Get A Request For News\n")

	articles, err := con.db.GetArticleOrderLimits("date", true, 0, 10)
	if err != nil {
		log.Error("Error In Mysql.GetArticleOrderLimits:", err)
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
	"label": 0,
	"date": "2018-12-30"
}
*/
func (con Controller) GetMore(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In Request:", NotPost)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Category int       `json:"category"`
		Tag      int       `json:"tag"`
		Label    int       `json:"label"`
		Date     time.Time `json:"date"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetMore: Category=%d, Tag=%d, Label=%d, Date=%v\n", x.Category, x.Tag, x.Label, x.Date)

	articles, err := con.db.GetArticleByDate(x.Category, x.Tag, x.Label, x.Date)
	if err != nil {
		log.Error("Error In Mysql.GetArticlesByDate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}
