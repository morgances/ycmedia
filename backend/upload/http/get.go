package http

import (
	"io/ioutil"
	"log"

	"github.com/morgances/ycmedia/backend/base"

	"github.com/TechCatsLab/apix/http/server"
)

func GetFile(ctx *server.Context) error {
	filePath := ctx.Request().URL.Path
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Println("Error In GetImage: ", err)
		return ctx.ServeJSON(base.RespStatusAndData(400, err))
	}

	ctx.Response().WriteHeader(200)
	ctx.Response().Write(data)
	return nil
}
