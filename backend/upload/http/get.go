package http

import (
	"io/ioutil"
	"log"
	"os"
	"github.com/morgances/ycmedia/backend/base"

	"github.com/TechCatsLab/apix/http/server"
)

func GetFile(ctx *server.Context) error {
	filePath := ctx.Request().URL.Path
	pwd, _ := os.Getwd()
	filePath = pwd + filePath
	log.Println("In GetFile:", filePath)

	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Println("Error In GetFile: ", err)
		return ctx.ServeJSON(base.RespStatusAndData(400, err.Error()))
	}

	ctx.Response().WriteHeader(200)
	ctx.Response().Write(data)
	return nil
}
