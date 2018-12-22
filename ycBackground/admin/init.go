/*
 * Revision History:
 *     Initial: 2018/09/02        Shi Ruitao
 */

package admin

import (
	"database/sql"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	httpAdmin "github.com/TechCatsLab/sor/admin/http"
	isactive "github.com/TechCatsLab/sor/admin/http/filter"
	admin "github.com/TechCatsLab/sor/admin/mysql"
	"github.com/TechCatsLab/sor/base"
	"github.com/TechCatsLab/sor/base/filter"
	httpPer "github.com/TechCatsLab/sor/permission/http"
	permission "github.com/TechCatsLab/sor/permission/mysql"
)

func InitAdminRouter(r *server.Router, db *sql.DB, tokenKey string) {
	if r == nil {
		log.Fatal("[InitRouter]: server is nil")
	}

	err := createTable(db)
	if err != nil {
		log.Fatal(err)
	}
	c := &httpAdmin.AdminHandler{
		base.New(db),
		tokenKey,
	}

	p := &httpPer.PermissionHandler{
		c.Controller,
	}

	active := &isactive.Active{
		base.New(db),
	}

	jwt := filter.New(tokenKey)

	filter.URLMap["/api/v1/admin/create"] = struct{}{}
	filter.URLMap["/api/v1/admin/login"] = struct{}{}

	r.Post("/api/v1/admin/create", c.Create)
	r.Post("/api/v1/admin/login", c.Login)
	r.Post("/api/v1/admin/email", c.Email, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/mobile", c.Mobile, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/newpwd", c.ModifyPwd, jwt.Check, active.Isactive)

	r.Post("/api/v1/permission/addrole", p.CreateRole, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/modifyrole", p.ModifyRole, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/activerole", p.ModifyRoleActive, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/getrole", p.RoleList, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/getidrole", p.GetRoleByID, jwt.Check, active.Isactive)

	r.Post("/api/v1/permission/addurl", p.AddURLPermission, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/removeurl", p.RemoveURLPermission, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/urlgetrole", p.URLPermissions, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/getpermission", p.Permissions, jwt.Check, active.Isactive)

	r.Post("/api/v1/permission/addrelation", p.AddRelation, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/removerelation", p.RemoveRelation, jwt.Check, active.Isactive)
}

func createTable(db *sql.DB) error {
	err := admin.CreateDatabase(db)
	if err != nil {
		return err
	}

	err = admin.CreateTable(db)
	if err != nil {
		return err
	}

	err = permission.CreatePermissionTable(db)
	if err != nil {
		return err
	}

	err = permission.CreateRelationTable(db)
	if err != nil {
		return err
	}

	err = permission.CreateRoleTable(db)
	if err != nil {
		return err
	}

	return nil
}
