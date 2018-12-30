package controller

import (
	"errors"

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
