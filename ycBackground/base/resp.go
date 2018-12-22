/*
 * Revision History:
 *     Initial: 2018/09/02        Shi Ruitao
 */

package base

import (
	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/sor/base/constants"
)

func RespStatusAndData(statusCode int, data interface{}) map[string]interface{} {
	if data == nil {
		return map[string]interface{}{constants.RespKeyStatus: statusCode}
	}
	return map[string]interface{}{constants.RespKeyStatus: statusCode, constants.RespKeyData: data}
}
func RespStatusAndTwoData(statusCode int, data1 interface{}, data2 interface{}) map[string]interface{} {
	if data1 == nil {
		return map[string]interface{}{constants.RespKeyStatus: statusCode}
	}
	return map[string]interface{}{constants.RespKeyStatus: statusCode, "order": data1, "items": data2}
}
func RespStatusAndIDCODEData(statusCode int, data1 interface{}, data2 interface{}) map[string]interface{} {
	if data1 == nil {
		return map[string]interface{}{constants.RespKeyStatus: statusCode}
	}
	return map[string]interface{}{constants.RespKeyStatus: statusCode, "id": data1, "code": data2}
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
