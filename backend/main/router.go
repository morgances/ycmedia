/*
 * Revision History:
 *     Initial: 2018/08/18        Feng Yifei
 */

package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/admin"
	"github.com/morgances/ycmedia/backend/banner"
	"github.com/morgances/ycmedia/backend/banner/config"
	"github.com/morgances/ycmedia/backend/upload"
)

var (
	router *server.Router
)

func init() {
	router = server.NewRouter()
	uploadDB, err := sql.Open("mysql", "root:123456@tcp(10.0.0.7:8806)/upload?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		logrus.Fatal(err)
	}
	upload.InitRouter(router, uploadDB, "http://127.0.0.1:9573", "UserTokenKey")

	adminDB, err := sql.Open("mysql", "root:123456@tcp(10.0.0.7:8806)/?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		logrus.Fatal(err)
	}
	admin.InitAdminRouter(router, adminDB, "AdminTokenKey")

	BannerDB, err := sql.Open("mysql", "root:123456@tcp(10.0.0.7:8806)/?parseTime=true")
	if err != nil {
		logrus.Fatal(err)
	}

	ccc := &config.Config{
		BannerDB:    "xixi",
		BannerTable: "haha",
	}

	banner.Register(router, BannerDB, ccc)
}
