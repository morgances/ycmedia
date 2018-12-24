/*
 * Revision History:
 *     Initial: 2018/09/04        Shi Ruitao
 */

package filter

import (
	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/admin/mysql"
	"github.com/morgances/ycmedia/backend/base"
)

type (
	Active struct {
		*base.Controller
	}
)

func (a *Active) Isactive(c *server.Context) bool {
	ctx := &base.Context{Context: c}

	isactive, err := mysql.AdminServer.IsActive(a.SQLStore(), ctx.UID())
	if err != nil {
		log.Error(err)
		return false
	}

	return isactive
}
