/*
 * Revision History:
 *     Initial: 2018/09/04        Shi Ruitao
 */

package http

import (
	"log"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/permission/mysql"
)

func (ph *PermissionHandler) AddRelation(c *server.Context) error {
	var (
		relation struct {
			AdminID uint32 `json:"admin_id" validate:"required"`
			RoleID  uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&relation)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&relation); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.AddRelation(ph.SQLStore(), relation.AdminID, relation.RoleID)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) RemoveRelation(c *server.Context) error {
	var (
		relation struct {
			AdminID uint32 `json:"admin_id" validate:"required"`
			RoleID  uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&relation)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&relation); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.RemoveRelation(ph.SQLStore(), relation.AdminID, relation.RoleID)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}
