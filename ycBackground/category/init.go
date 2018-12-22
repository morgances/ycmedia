package category

import (
	"database/sql"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/category/config"
	"github.com/TechCatsLab/sor/category/controller"
)

func Register(r *server.Router, db *sql.DB, cnf *config.Config) error {
	if r == nil {
		logrus.Fatal("[InitRouter]: server is nil")
	}

	c := controller.New(db, cnf)

	if err := c.CreateDB(); err != nil {
		return err
	}

	if err := c.CreateTable(); err != nil {
		return err
	}

	r.Post("/api/v1/category/create", c.Insert)
	r.Post("/api/v1/category/modify/status", c.ChangeCategoryStatus)
	r.Post("/api/v1/category/modify/name", c.ChangeCategoryName)
	r.Post("/api/v1/category/children", c.LisitChirldrenByParentId)

	return nil
}
