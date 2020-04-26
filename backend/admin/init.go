/*
 * Revision History:
 *     Initial: 2018/09/02        Shi Ruitao
 */

package admin

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/TechCatsLab/apix/http/server"
	httpAdmin "github.com/morgances/ycmedia/backend/admin/http"
	isactive "github.com/morgances/ycmedia/backend/admin/http/filter"
	admin "github.com/morgances/ycmedia/backend/admin/mysql"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/filter"
	httpPer "github.com/morgances/ycmedia/backend/permission/http"
	permission "github.com/morgances/ycmedia/backend/permission/mysql"
)

func InitAdminRouter(r *server.Router, db *sql.DB, tokenKey string) {
	if r == nil {
		log.Fatal("[InitRouter]: server is nil")
	}

	err := createTableAndInitAdminUser(db)
	if err != nil {
		log.Fatal(err)
	}
	c := &httpAdmin.AdminHandler{
		Controller: base.New(db),
		Token:      tokenKey,
	}

	p := &httpPer.PermissionHandler{
		Controller: c.Controller,
	}

	active := &isactive.Active{
		Controller: base.New(db),
	}

	jwt := filter.NewWithDB(tokenKey, db)

	filter.URLMap["/api/v1/admin/login"] = struct{}{}

	r.Post("/api/v1/admin/login", c.Login)
	r.Post("/api/v1/admin/create", c.Create, jwt.Check, active.Isactive)
	//these are only modify by self
	r.Post("/api/v1/admin/email", c.Email, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/mobile", c.Mobile, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/newpwd", c.ModifyPwd, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/check", c.Isactive, jwt.Check, active.Isactive)
	r.Post("/api/v1/admin/active", c.ModifyActive, jwt.Check, active.Isactive)

	//record roles
	r.Post("/api/v1/permission/addrole", p.CreateRole, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/modify", p.ModifyRole, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/active", p.ModifyRoleActive, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/rolelist", p.RoleList, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/roleid", p.GetRoleByID, jwt.Check, active.Isactive)

	//record url which role can use
	r.Post("/api/v1/permission/addurl", p.AddURLPermission, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/removeurl", p.RemoveURLPermission, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/check", p.URLPermissions, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/permissionlist", p.Permissions, jwt.Check, active.Isactive)

	//record role-admin
	r.Post("/api/v1/permission/addrelation", p.AddRelation, jwt.Check, active.Isactive)
	r.Post("/api/v1/permission/removerelation", p.RemoveRelation, jwt.Check, active.Isactive)
}

func createTableAndInitAdminUser(db *sql.DB) error {
	err := admin.CreateDatabase(db)
	if err != nil {
		return err
	}

	err = admin.CreateTable(db)
	if err != nil {
		return err
	}

	err = admin.CreteAdminUser(db)
	if err != nil {
		fmt.Println("[error] in create default Admin User: ", err.Error())
	}else {
		fmt.Println("Create admin user with password: ", admin.AdminUser, admin.AdminPwd)
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
