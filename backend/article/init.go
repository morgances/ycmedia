package article

import (
	"database/sql"
	"log"

	"github.com/TechCatsLab/apix/http/server"
	isactive "github.com/morgances/ycmedia/backend/admin/http/filter"
	"github.com/morgances/ycmedia/backend/article/controller"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/filter"
)

func Register(r *server.Router, db *sql.DB, tokenKey string) error {
	if r == nil {
		log.Fatal("[InitRouter]: server is nil")
	}

	c := controller.New(db)

	if err := c.CreateDatabase(); err != nil {
		return err
	}

	if err := c.GetDB().CreateArticleTable(); err != nil {
		return err
	}

	active := &isactive.Active{
		Controller: base.New(db),
	}

	jwt := filter.NewWithDB(tokenKey, db)

	filter.URLMap["/api/v1/article/add"] = struct{}{}
	filter.URLMap["/api/v1/article/delete"] = struct{}{}
	filter.URLMap["/api/v1/article/update"] = struct{}{}

	filter.URLMap["/api/v1/article/news"] = struct{}{}
	filter.URLMap["/api/v1/article/getlist"] = struct{}{}
	filter.URLMap["/api/v1/article/gettext"] = struct{}{}
	filter.URLMap["/api/v1/article/getmore"] = struct{}{}
	filter.URLMap["/api/v1/article/getall"] = struct{}{}

	r.Post("/api/v1/article/add", c.Add, jwt.Check, active.Isactive)
	r.Post("/api/v1/article/delete", c.Delete, jwt.Check, active.Isactive)
	r.Post("/api/v1/article/update", c.Update, jwt.Check, active.Isactive)

	// r.Post("/api/v1/article/add", c.Add)
	// r.Post("/api/v1/article/delete", c.Delete)
	// r.Post("/api/v1/article/update", c.Update)

	r.Post("/api/v1/article/news", c.GetNews)
	r.Post("/api/v1/article/getlist", c.GetArticleList)
	r.Post("/api/v1/article/gettext", c.GetTextById)
	r.Post("/api/v1/article/getmore", c.GetMore)
	r.Post("/api/v1/article/getall", c.GetAll)

	return nil
}
