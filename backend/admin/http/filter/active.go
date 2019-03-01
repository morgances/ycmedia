package filter

import (
	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
)

/*
a single active check with base controller
*/
type (
	Active struct {
		*base.Controller
	}
)

func (a *Active) Isactive(c *server.Context) bool {
	// ctx := &base.Context{Context: c}
	// id := ctx.UID()

	// isactive, err := mysql.AdminServer.IsActive(a.SQLStore(), id)
	// if err != nil {
	// 	log.Error("[user active]", err)
	// 	return false
	// }

	// return isactive
	return true
}
