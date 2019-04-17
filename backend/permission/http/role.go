/*
 * Revision History:
 *     Initial: 2018/08/31        Shi Ruitao
 */

package http

import (
	"log"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/permission/mysql"
)

type (
	PermissionHandler struct {
		*base.Controller
	}
)

func (ph *PermissionHandler) CreateRole(c *server.Context) error {
	var (
		role struct {
			Name  string `json:"name"  validate:"required,alphanumunicode,min=2,max=64"`
			Intro string `json:"intro" validate:"required,alphanumunicode,min=2,max=256"`
		}
	)

	err := c.JSONBody(&role)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&role); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	id, err := mysql.Service.CreateRole(ph.SQLStore(), role.Name, role.Intro)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, id))
}

func (ph *PermissionHandler) ModifyRole(c *server.Context) error {
	var (
		role struct {
			ID    uint32 `json:"id"    validate:"required"`
			Name  string `json:"name"  validate:"required,alphanumunicode,min=2,max=64"`
			Intro string `json:"intro" validate:"required,alphanumunicode,min=2,max=256"`
		}
	)

	err := c.JSONBody(&role)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&role); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.ModifyRole(ph.SQLStore(), role.ID, role.Name, role.Intro)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) ModifyRoleActive(c *server.Context) error {
	var (
		role struct {
			ID     uint32 `json:"id"    validate:"required"`
			Active bool   `json:"active"`
		}
	)

	err := c.JSONBody(&role)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&role); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.ModifyRoleActive(ph.SQLStore(), role.ID, role.Active)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) RoleList(c *server.Context) error {
	result, err := mysql.Service.RoleList(ph.SQLStore())
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, result))
}

func (ph *PermissionHandler) GetRoleByID(c *server.Context) error {
	var (
		role struct {
			ID uint32 `json:"id" validate:"required"`
		}
	)

	err := c.JSONBody(&role)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&role); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	result, err := mysql.Service.GetRoleByID(ph.SQLStore(), role.ID)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, result))
}
