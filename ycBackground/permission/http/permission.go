/*
 * Revision History:
 *     Initial: 2018/08/31        Shi Ruitao
 */

package http

import (
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/base"
	"github.com/TechCatsLab/sor/permission/mysql"
)

func (ph *PermissionHandler) AddURLPermission(c *server.Context) error {
	var (
		url struct {
			URL    string `json:"url"     validate:"required"`
			RoleId uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&url)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&url); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.AddURLPermission(ph.SQLStore(), url.RoleId, url.URL)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) RemoveURLPermission(c *server.Context) error {
	var (
		url struct {
			URL    string `json:"url"     validate:"required"`
			RoleId uint32 `json:"role_id" validate:"required"`
		}
	)

	err := c.JSONBody(&url)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&url); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	err = mysql.Service.RemoveURLPermission(ph.SQLStore(), url.RoleId, url.URL)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ph *PermissionHandler) URLPermissions(c *server.Context) error {
	var (
		url struct {
			URL string `json:"url" validate:"required"`
		}
	)

	err := c.JSONBody(&url)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&url); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	result, err := mysql.Service.URLPermissions(ph.SQLStore(), url.URL)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, result))
}

func (ph *PermissionHandler) Permissions(c *server.Context) error {
	result, err := mysql.Service.Permissions(ph.SQLStore())
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, result))
}
