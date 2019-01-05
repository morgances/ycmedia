package mysql

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/morgances/ycmedia/backend/article/mysql/config"
)

type Database struct {
	DB *sql.DB
}

func Dial() (Database, error) {
	d, err := sql.Open("mysql", config.MysqlDefaultConfig.String())
	if err != nil {
		return Database{}, err
	}
	db := Database{
		DB: d,
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
		DB: d,
	}
	err = db.CreateArticleTable()
	return db, err
}

func rowsToArticles(rs *sql.Rows) ([]*Article, error) {
	list := make([]*Article, 0, 1)
	for rs.Next() {
		var x = &Article{}
		err := rs.Scan(&x.Aid, &x.Uid, &x.Category, &x.Tag, &x.Title, &x.Author, &x.Date, &x.Image, &x.Text)
		if err != nil {
			return nil, err
		}
		list = append(list, x)
	}
	return list, nil
}

func (d Database) GetDB() *sql.DB {
	return d.DB
}

func (d Database) Close() error {
	return d.DB.Close()
}

func (d Database) CreateArticleTable() error {
	_, err := d.DB.Exec(CreateArticleTableCommand)
	return err
}
