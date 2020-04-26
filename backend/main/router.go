package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/admin"
	"github.com/morgances/ycmedia/backend/article"
	"github.com/morgances/ycmedia/backend/banner"
	"github.com/morgances/ycmedia/backend/upload"
)

var (
	router *server.Router
)

func init() {
	router = server.NewRouter()
	// uploadDB, err := sql.Open("mysql", "root:123456@tcp(172.17.0.3:3306)/article?charset=utf8mb4&parseTime=True&loc=Local")
	uploadDB, err := sql.Open("mysql", "root:123456@tcp(39.105.141.168:3307)/article?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		log.Fatal(err)
	}
	// uploadDB.SetMaxIdleConns(0)
	upload.InitRouter(router, uploadDB, "http://39.105.141.168:9573/", "AdminTokenKey")
	//upload.InitRouter(router, uploadDB, "http://127.0.0.1:9573/", "AdminTokenKey")
	admin.InitAdminRouter(router, uploadDB, "AdminTokenKey")
	banner.Register(router, uploadDB, "AdminTokenKey")
	article.Register(router, uploadDB, "AdminTokenKey")
	// fmt.Println("server start")
}
