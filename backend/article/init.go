package article

import (
	"database/sql"

	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/filter"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	isactive "github.com/morgances/ycmedia/backend/admin/http/filter"
	"github.com/morgances/ycmedia/backend/article/controller"
)

func Register(r *server.Router, db *sql.DB, tokenKey string) error {
	if r == nil {
		logrus.Fatal("[InitRouter]: server is nil")
	}

	c := controller.New(db)

	if err := c.GetDB().CreateArticleTable(); err != nil {
		return err
	}

	active := &isactive.Active{
		Controller: base.New(db),
	}

	jwt := filter.NewWithDB(tokenKey, db)

	filter.URLMap["/api/v1/article/add"] = struct{}{}
	filter.URLMap["/api/v1/article/del"] = struct{}{}

	filter.URLMap["/api/v1/article/news"] = struct{}{}
	filter.URLMap["/api/v1/article/getlist"] = struct{}{}
	filter.URLMap["/api/v1/article/gettext"] = struct{}{}
	filter.URLMap["/api/v1/article/getmore"] = struct{}{}

	r.Post("/api/v1/article/add", c.Add, jwt.Check, active.Isactive)
	r.Post("/api/v1/article/del", c.Delete, jwt.Check, active.Isactive)

	r.Get("/api/v1/article/news", c.GetNews)
	r.Post("/api/v1/article/getlist", c.GetArticleList)
	r.Post("/api/v1/article/gettext", c.GetTextById)
	r.Post("/api/v1/article/getmore", c.GetMore)

	return nil
}