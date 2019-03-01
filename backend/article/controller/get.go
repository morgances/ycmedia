package controller

import (
	"net/http"
	"time"

	"github.com/morgances/ycmedia/backend/base/constants"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/base"
)

func (con Controller) GetArticleList(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In GetList.Request:", NotPost)
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
		log.Error("Error In GetList.JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetArticleList: Category=%d, Tag=%d, Label=%d, Page=%d\n", x.Category, x.Tag, x.Label, x.Page)

	if x.Category < 0 || x.Tag < -1 || x.Label < -1 || x.Page < 1 {
		log.Error("Error In GetList.DataCheck:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	articles, err := con.db.GetArticleListDesc(x.Category, x.Tag, x.Label, x.Page*10-10, 10, "date")
	if err != nil {
		log.Error("Error In GetList.Mysql:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	articleCount, pageCount, err := con.db.GetArticleAndPageCount(x.Category, x.Tag, x.Label)
	if err != nil {
		log.Error("Error In GetList.Mysql:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(map[string]interface{}{
		constants.RespKeyStatus: http.StatusOK,
		constants.RespKeyData:   articles,
		"articleCount":          articleCount,
		"pageCount":             pageCount,
	})
}

func (con Controller) GetTextById(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In GetText.Request:", NotGet)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotPost))
	}

	var x struct {
		Aid int `json:"aid"`
	}

	err := ctx.JSONBody(&x)
	if err != nil {
		log.Error("Error In GetText.JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetText: aid=%d\n", x.Aid)

	if x.Aid < 1 {
		log.Error("Error In GetText.DataCheck:", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	article, err := con.db.GetArticleById(x.Aid)
	if err != nil {
		log.Error("Error In GetText.Mysql:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, article))
}

func (con Controller) GetNews(ctx *server.Context) error {
	if ctx.Request().Method != "GET" {
		log.Error("Error In GetNews.Request:", NotGet)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, NotGet))
	}

	log.Infof("Get A Request For News\n")

	articles, err := con.db.GetArticleOrderLimits("date", true, 0, 10)
	if err != nil {
		log.Error("Error In GetNews.Mysql:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}

func (con Controller) GetMore(ctx *server.Context) error {
	if ctx.Request().Method != "POST" {
		log.Error("Error In GetMore.Request:", NotPost)
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
		log.Error("Error In GetMore.JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	log.Infof("In GetMore: Category=%d, Tag=%d, Label=%d, Date=%v\n", x.Category, x.Tag, x.Label, x.Date)

	if x.Category < 0 || x.Tag < -1 || x.Label < -1 {
		log.Error("Error In GetMore.DataCheck: ", BadData)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, BadData))
	}

	articles, err := con.db.GetArticleByDate(x.Category, x.Tag, x.Label, x.Date)
	if err != nil {
		log.Error("Error In GetMore.Mysql:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	for _, e := range articles {
		e.Text = ""
	}

	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, articles))
}
