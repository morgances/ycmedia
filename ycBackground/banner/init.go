package banner

import (
	"database/sql"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/banner/config"
	"github.com/TechCatsLab/sor/banner/controller"
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

	r.Post("/api/v1/banner/create", c.Insert)
	r.Post("/api/v1/banner/delete", c.DeleteById)
	r.Post("/api/v1/banner/info/id", c.InfoById)
	r.Post("/api/v1/banner/list/date", c.LisitValidBannerByUnixDate)

	return nil
}
