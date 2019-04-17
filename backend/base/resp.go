package base

import (
	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base/constants"
)

func RespStatusAndData(statusCode int, data interface{}) map[string]interface{} {
	if data == nil {
		return map[string]interface{}{constants.RespKeyStatus: statusCode}
	}
	return map[string]interface{}{constants.RespKeyStatus: statusCode, constants.RespKeyData: data}
}

func WriteStatusAndIDJSON(ctx *server.Context, status int, id interface{}) error {
	return ctx.ServeJSON(map[string]interface{}{
		constants.RespKeyStatus: status,
		"ID": id,
	})
}

func WriteStatusAndDataJSON(ctx *server.Context, status int, data interface{}) error {
	if data == nil {
		return ctx.ServeJSON(map[string]interface{}{constants.RespKeyStatus: status})
	}

	return ctx.ServeJSON(map[string]interface{}{
		constants.RespKeyStatus: status,
		constants.RespKeyData:   data,
	})
}

func WriteStatusAndPageJSON(ctx *server.Context, status int, data, data1, data2, pages interface{}) error {
	if data == nil || data1 == nil || data2 == nil {
		return ctx.ServeJSON(map[string]interface{}{constants.RespKeyStatus: status})
	}

	return ctx.ServeJSON(map[string]interface{}{
		"Current":               data1,
		"Pages":                 pages,
		"Total":                 data2,
		constants.RespKeyStatus: status,
		constants.RespKeyData:   data,
	})
}
