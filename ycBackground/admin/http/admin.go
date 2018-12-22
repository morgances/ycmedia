/*
 * Revision History:
 *     Initial: 2018/08/28        Shi Ruitao
 */

package http

import (
	"net/http"
	"errors"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/admin/mysql"
	"github.com/TechCatsLab/sor/base"
	"github.com/TechCatsLab/sor/base/filter"
)

var (
	errPwdRepeat   = errors.New("the new password can't be the same as the old password")
	errPwdDisagree = errors.New("the new password and confirming password disagree")
)

type (
	AdminHandler struct {
		*base.Controller
		Token string
	}
)

// Create create staff information
func (ah *AdminHandler) Create(c *server.Context) error {
	var admin struct {
		Name     string `json:"name"      validate:"required,alphanum,min=2,max=30"`
		Pwd      string `json:"pwd"       validete:"printascii,min=6,max=30"`
		RealName string `json:"real_name" validate:"required,min=2,max=30"`
		Mobile   string `json:"mobile"    validate:"required,numeric,len=11"`
		Email    string `json:"email"     validate:"required,email"`
	}

	err := c.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	err = mysql.AdminServer.Create(ah.SQLStore(), &admin.Name, &admin.Pwd, &admin.RealName, &admin.Mobile, &admin.Email)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

// Login user login
func (ah *AdminHandler) Login(c *server.Context) error {
	var (
		admin struct {
			Name string `json:"name" validate:"required,alphanum,min=2,max=30"`
			Pwd  string `json:"pwd"  validete:"printascii,min=6,max=30"`
		}
	)

	ctx := &base.Context{c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	id, err := mysql.AdminServer.Login(ah.SQLStore(), &admin.Name, &admin.Pwd)
	if err != nil {
		log.Error(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	token, err := filter.NewAdminToken(id, ah.Token)
	ctx.SetUID(id)
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, token))
}

// Email modify email
func (ah *AdminHandler) Email(c *server.Context) error {
	var (
		admin struct {
			Email string `json:"email" validate:"required,email"`
		}
	)

	ctx := &base.Context{c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyEmail(ah.SQLStore(), uint32(id), &admin.Email)
	if err != nil {
		log.Error(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

// Mobile modify mobile
func (ah *AdminHandler) Mobile(c *server.Context) error {
	var (
		admin struct {
			Mobile string `json:"mobile" validate:"required,numeric,len=11"`
		}
	)

	ctx := &base.Context{c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyMobile(ah.SQLStore(), uint32(id), &admin.Mobile)
	if err != nil {
		log.Error(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ah *AdminHandler) ModifyPwd(c *server.Context) error {
	var (
		admin struct {
			Pwd     string `json:"pwd"      validete:"printascii,min=6,max=30"`
			NewPwd  string `json:"new_pwd"  validete:"printascii,min=6,max=30"`
			Confirm string `json:"confirm"  validete:"printascii,min=6,max=30"`
		}
	)
	ctx := &base.Context{c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	if admin.NewPwd == admin.Pwd {
		log.Error(errPwdRepeat)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	if admin.NewPwd != admin.Confirm {
		log.Debug(errPwdDisagree)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyPwd(ah.SQLStore(), uint32(id), &admin.Pwd, &admin.NewPwd)
	if err != nil {
		log.Error(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ah *AdminHandler) ModifyActive(c *server.Context) error {
	var (
		admin struct {
			Id     uint32 `json:"id" validate:"required"`
			Active bool   `json:"active"`
		}
	)

	err := c.JSONBody(&admin)
	if err != nil {
		log.Error("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	if err = c.Validate(&admin); err != nil {
		log.Error("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	err = mysql.AdminServer.ModifyActive(ah.SQLStore(), admin.Id, admin.Active)
	if err != nil {
		log.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ah *AdminHandler) Isactive(c *server.Context) error {
	ctx := &base.Context{c}
	id := ctx.UID()
	isactive, err := mysql.AdminServer.IsActive(ah.SQLStore(), uint32(id))
	if err != nil {
		log.Error(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, nil))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, isactive))
}
