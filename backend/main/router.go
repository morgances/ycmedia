package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/admin"
	"github.com/morgances/ycmedia/backend/article"
	"github.com/morgances/ycmedia/backend/banner"
	"github.com/morgances/ycmedia/backend/upload"
)

var (
	router *server.Router
)

//root:123456@tcp(127.0.0.1:8806)
func init() {
	router = server.NewRouter()
	uploadDB, err := sql.Open("mysql", "root:123456@tcp(39.98.162.91:3307)/article?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		logrus.Fatal(err)
	}
	upload.InitRouter(router, uploadDB, "http://127.0.0.1:9573", "AdminTokenKey")
	admin.InitAdminRouter(router, uploadDB, "AdminTokenKey")
	banner.Register(router, uploadDB, "AdminTokenKey")
	article.Register(router, uploadDB, "AdminTokenKey")
}
