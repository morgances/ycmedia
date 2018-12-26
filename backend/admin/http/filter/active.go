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

/*
a single active check with base controller
*/
type (
	Active struct {
		*base.Controller
	}
)

func (a *Active) Isactive(c *server.Context) bool {
	ctx := &base.Context{Context: c}
	id := ctx.UID()
	//url := c.Request().URL

	isactive, err := mysql.AdminServer.IsActive(a.SQLStore(), id)
	if err != nil {
		log.Error(err)
		return false
	}

	//验证permission
	return isactive
}
