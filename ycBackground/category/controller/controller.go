package controller

import (
	"database/sql"

	"github.com/TechCatsLab/sor/base/constants"

	"github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/base"

	"github.com/TechCatsLab/apix/http/server"

	"github.com/TechCatsLab/sor/category/config"
	"github.com/TechCatsLab/sor/category/service"
)

type Controller struct {
	service *service.TransactService
}

func New(db *sql.DB, c *config.Config) *Controller {
	return &Controller{
		service: service.NewCategoryService(c, db),
	}
}

func (con *Controller) CreateDB() error {
	return con.service.CreateDB()
}

func (con *Controller) CreateTable() error {
	return con.service.CreateTable()
}

func (con *Controller) Insert(c *server.Context) error {
	var (
		req struct {
			ParentId uint   `json:"parentId"`
			Name     string `json:"name"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrInvalidParam, nil))
	}

	id, err := con.service.Insert(req.ParentId, req.Name)
	if err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrCreateInMysql, nil))
	}

	return base.WriteStatusAndIDJSON(c, constants.ErrSucceed, id)
}

func (con *Controller) ChangeCategoryStatus(c *server.Context) error {
	var (
		req struct {
			CategoryId uint `json:"categoryId"`
			Status     int8 `json:"status"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrInvalidParam, nil))
	}

	err := con.service.ChangeCategoryStatus(req.CategoryId, req.Status)
	if err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrOprationInMysql, nil))
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, nil)
}

func (con *Controller) ChangeCategoryName(c *server.Context) error {
	var (
		req struct {
			CategoryId uint   `json:"categoryId"`
			Name       string `json:"name"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, nil)
	}

	err := con.service.ChangeCategoryName(req.CategoryId, req.Name)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrOprationInMysql, nil)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, nil)
}

func (con *Controller) LisitChirldrenByParentId(c *server.Context) error {
	var (
		req struct {
			ParentId uint `json:"parentId"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, nil)
	}

	categorys, err := con.service.LisitChirldrenByParentId(req.ParentId)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrOprationInMysql, nil)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, categorys)
}
