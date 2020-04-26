package http

import (
	"errors"
	"log"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/morgances/ycmedia/backend/admin/mysql"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/filter"
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
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if err = c.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}
	err = mysql.AdminServer.Create(ah.SQLStore(), &admin.Name, &admin.Pwd, &admin.RealName, &admin.Mobile, &admin.Email)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
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

	ctx := &base.Context{Context: c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}
	if err = ctx.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	id, err := mysql.AdminServer.Login(ah.SQLStore(), &admin.Name, &admin.Pwd)
	if err != nil {
		log.Println(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	token, err := filter.NewAdminToken(id, ah.Token)
	ctx.SetUID(id)
	log.Println("Login: ",admin)
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, token))
}

// Email modify email and DIY
func (ah *AdminHandler) Email(c *server.Context) error {
	var (
		admin struct {
			Email string `json:"email" validate:"required,email"`
		}
	)

	ctx := &base.Context{Context: c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyEmail(ah.SQLStore(), uint32(id), &admin.Email)
	if err != nil {
		log.Println(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
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

	ctx := &base.Context{Context: c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyMobile(ah.SQLStore(), uint32(id), &admin.Mobile)
	if err != nil {
		log.Println(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
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
	ctx := &base.Context{Context: c}

	err := ctx.JSONBody(&admin)
	if err != nil {
		log.Println("Error in JSONBody:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if err = ctx.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if admin.NewPwd == admin.Pwd {
		log.Println(errPwdRepeat)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	if admin.NewPwd != admin.Confirm {
		log.Panicln(errPwdDisagree)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	id := ctx.UID()
	err = mysql.AdminServer.ModifyPwd(ah.SQLStore(), uint32(id), &admin.Pwd, &admin.NewPwd)
	if err != nil {
		log.Println(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
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
		log.Println("Error in JSONBody:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}
	if err = c.Validate(&admin); err != nil {
		log.Println("Error in Validate:", err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	err = mysql.AdminServer.ModifyActive(ah.SQLStore(), admin.Id, admin.Active)
	if err != nil {
		log.Println(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}

	return c.ServeJSON(base.RespStatusAndData(http.StatusOK, nil))
}

func (ah *AdminHandler) Isactive(c *server.Context) error {
	ctx := &base.Context{Context: c}
	id := ctx.UID()
	isactive, err := mysql.AdminServer.IsActive(ah.SQLStore(), uint32(id))
	if err != nil {
		log.Println(err)
		return ctx.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err.Error()))
	}
	return ctx.ServeJSON(base.RespStatusAndData(http.StatusOK, isactive))
}
