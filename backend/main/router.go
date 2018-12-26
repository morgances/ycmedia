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
	"github.com/morgances/ycmedia/backend/upload"
)

var (
	router *server.Router
)

func init() {
	router = server.NewRouter()
	/*
		把这个upload的模块揉进两个模块管理本身，同时也在他们模块初始化的时候初始化
	*/
	//to do fixed
	uploadDB, err := sql.Open("mysql", "root:123456@tcp(0.0.0.0:8806)/?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		logrus.Fatal(err)
	}
	upload.InitRouter(router, uploadDB, "http://127.0.0.1:9573", "AdminTokenKey")

	adminDB, err := sql.Open("mysql", "root:123456@tcp(0.0.0.0:8806)/?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		logrus.Fatal(err)
	}
	admin.InitAdminRouter(router, adminDB, "AdminTokenKey")

	BannerDB, err := sql.Open("mysql", "root:123456@tcp(0.0.0.0:8806)/?parseTime=true")
	if err != nil {
		logrus.Fatal(err)
	}

	banner.Register(router, BannerDB, "AdminTokenKey")
}
