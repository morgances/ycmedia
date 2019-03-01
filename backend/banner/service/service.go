package service

import (
	"database/sql"

	"github.com/morgances/ycmedia/backend/banner/model/mysql"
)

type BannerService struct {
	db   *sql.DB
	SQLS []string
}

func NewBannerService(db *sql.DB) *BannerService {
	database := "banner.banner"
	bs := &BannerService{
		db: db,
		SQLS: []string{
			`CREATE DATABASE IF NOT EXISTS yc`,
			`CREATE TABLE IF NOT EXISTS ` + database + `(
				bannerId INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
				name VARCHAR(512)  DEFAULT NULL COMMENT 'sign',
				imagePath VARCHAR(512) DEFAULT NULL ,
				event VARCHAR(512) DEFAULT NULL COMMENT 'what to trigger',
				PRIMARY KEY (bannerId)
			)ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=utf8mb4`,
			`INSERT INTO ` + database + ` (name,imagePath,event) VALUES (?,?,?)`,
			`SELECT * FROM ` + database + ` WHERE bannerid = ? LIMIT 1 LOCK IN SHARE MODE`,
			`DELETE FROM ` + database + ` WHERE bannerid = ? LIMIT 1`,
			`SELECT * FROM ` + database + ` LOCK IN SHARE MODE`,
			`UPDATE ` + database + ` SET name = ? ,imagePath = ?, event = ? WHERE bannerid = ?`,
		},
	}
	return bs
}

func (bs *BannerService) CreateDB() error {
	return mysql.CreateDB(bs.db, bs.SQLS[0])
}

func (bs *BannerService) CreateTable() error {
	return mysql.CreateTable(bs.db, bs.SQLS[1])
}

//return bannerid
func (bs *BannerService) Insert(name string, imagePath string, event string) (int, error) {
	return mysql.InsertBanner(bs.db, bs.SQLS[2], name, imagePath, event)
}

func (bs *BannerService) InfoById(id int) (*mysql.Banner, error) {
	ban, err := mysql.InfoById(bs.db, bs.SQLS[3], id)
	if err != nil {
		return nil, err
	}

	return ban, nil
}

func (bs *BannerService) DeleteById(id int) error {
	err := mysql.DeleteById(bs.db, bs.SQLS[4], id)
	return err
}

func (bs *BannerService) ListBanner() ([]*mysql.Banner, error) {
	bans, err := mysql.ListBanner(bs.db, bs.SQLS[5])
	if err != nil {
		return nil, err
	}

	return bans, nil
}

func (bs *BannerService) Update(name string, imagePath string, event string, id int) (int, error) {
	return mysql.UpdateByID(bs.db, bs.SQLS[6], name, imagePath, event, id)
}
