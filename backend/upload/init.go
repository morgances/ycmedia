/*
 * Revision History:
 *     Initial: 2018/08/10        Shi Ruitao
 */

package upload

import (
	"database/sql"
	"os"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/ycmedia/backend/base"
	"github.com/TechCatsLab/ycmedia/backend/base/constants"
	"github.com/TechCatsLab/ycmedia/backend/base/filter"
	"github.com/TechCatsLab/ycmedia/backend/upload/http"
	"github.com/TechCatsLab/ycmedia/backend/upload/mysql"
)

func InitRouter(r *server.Router, db *sql.DB, baseUrl, tokenKey string) {
	if r == nil {
		log.Fatal("[InitRouter]: server is nil")
	}

	err := mysql.CreateTable(db)
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

	jwt := filter.New(tokenKey)

	r.Post("/api/v1/user/upload", c.Upload, jwt.Check)
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
