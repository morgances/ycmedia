package controller

import (
	"database/sql"
	"errors"

	"github.com/morgances/ycmedia/backend/article/mysql"
)

type Controller struct {
	db mysql.Database
}

var (
	NotPost error = errors.New("Only Receive Post !")
	NotGet  error = errors.New("Only Receive Get !")
	BadData error = errors.New("Bad Error !")
)

func New(d *sql.DB) Controller {
	return Controller{
		db: mysql.Database{
			DB: d,
		},
	}
}

func (con Controller) GetDB() mysql.Database {
	return con.db
}
