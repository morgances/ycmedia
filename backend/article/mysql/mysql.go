package mysql

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/morgances/ycmedia/backend/article/mysql/config"
)

type Database struct {
	db *sql.DB
}

func Dial() (Database, error) {
	d, err := sql.Open("mysql", config.MysqlDefaultConfig.String())
	if err != nil {
		return Database{}, err
	}
	db := Database{
		db: d,
	}
	err = db.CreateArticleTable()
	return db, err
}

func DIYDial(dataSourceName string) (Database, error) {
	d, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return Database{}, err
	}
	db := Database{
		db: d,
	}
	err = db.CreateArticleTable()
	return db, err
}

func (d Database) GetDB() *sql.DB {
	return d.db
}

func (d Database) Close() error {
	return d.db.Close()
}
