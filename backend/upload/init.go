/*
 * Revision History:
 *     Initial: 2018/08/10        Shi Ruitao
 */

package upload

import (
	"database/sql"
	"log"
	"os"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/constants"
	"github.com/morgances/ycmedia/backend/base/filter"
	"github.com/morgances/ycmedia/backend/upload/http"
	"github.com/morgances/ycmedia/backend/upload/mysql"
)

func InitRouter(r *server.Router, db *sql.DB, baseUrl, tokenKey string) {
	if r == nil {
		log.Fatal("[InitRouter]: server is nil")
	}
	err := mysql.CreateDatabase(db)
	if err != nil {
		log.Fatal(err)
	}

	err = mysql.CreateTable(db)
	if err != nil {
		log.Fatal(err)
	}

	err = checkDir(constants.PictureDir, constants.VideoDir, constants.OtherDir)
	if err != nil {
		log.Fatal(err)
	}

	c := &http.UploadController{
		Controller: base.New(db),
		BaseURL:    baseUrl,
	}

	jwt := filter.NewWithDB(tokenKey, db)

	filter.URLMap["/api/v1/upload"] = struct{}{}
	filter.URLMap["/files"] = struct{}{}

	r.Get("/files/", http.GetFile)
	r.Post("/api/v1/upload", c.Upload, jwt.Check)
}

func checkDir(path ...string) error {
	for _, name := range path {
		_, err := os.Stat(constants.FileUploadDir + "/" + name)
		if err != nil {
			if os.IsNotExist(err) {
				err = os.MkdirAll(constants.FileUploadDir+"/"+name, 0777)
				if err != nil {
					return err
				}
			}
		}
	}
	return nil
}
