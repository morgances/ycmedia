/*
 * Revision History:
 *     Initial: 2018/09/04        Shi Ruitao
 */

package http

import (
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/base"
	"github.com/TechCatsLab/sor/permission/mysql"
)

func (ph *PermissionHandler) AddRelation(c *server.Context) error {
	var (
		relation struct{
			AdminID uint32 `json:"admin_id" validate:"required"`
			RoleID uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&relation)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&relation); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.AddRelation(ph.SQLStore(), relation.AdminID, relation.RoleID)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) RemoveRelation(c *server.Context) error {
	var (
		relation struct{
			AdminID uint32 `json:"admin_id" validate:"required"`
			RoleID uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&relation)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&relation); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.RemoveRelation(ph.SQLStore(), relation.AdminID, relation.RoleID)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
