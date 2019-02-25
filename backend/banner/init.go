package banner

import (
	"database/sql"

	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/filter"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	isactive "github.com/morgances/ycmedia/backend/admin/http/filter"
	"github.com/morgances/ycmedia/backend/banner/controller"
)

func Register(r *server.Router, db *sql.DB, tokenKey string) error {
	if r == nil {
		logrus.Fatal("[InitRouter]: server is nil")
	}

	c := controller.New(db)

	if err := c.CreateDB(); err != nil {
		return err
	}

	if err := c.CreateTable(); err != nil {
		return err
	}

	active := &isactive.Active{
		Controller: base.New(db),
	}

	jwt := filter.NewWithDB(tokenKey, db)

	filter.URLMap["/api/v1/banner/detail"] = struct{}{}
	filter.URLMap["/api/v1/banner/all"] = struct{}{}
	filter.URLMap["/api/v1/banner/delete"] = struct{}{}
	filter.URLMap["/api/v1/banner/create"] = struct{}{}
	filter.URLMap["/api/v1/banner/update"] = struct{}{}

	r.Post("/api/v1/banner/create", c.Insert, jwt.Check, active.Isactive)
	r.Post("/api/v1/banner/delete", c.DeleteById, jwt.Check, active.Isactive)
	r.Post("/api/v1/banner/update", c.Update, jwt.Check, active.Isactive)
	r.Post("/api/v1/banner/detail", c.InfoById)
	r.Get("/api/v1/banner/all", c.ListBanner)

	return nil
}
