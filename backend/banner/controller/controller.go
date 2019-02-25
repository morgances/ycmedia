package controller

import (
	"database/sql"
	"net/http"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/logging/logrus"
	"github.com/morgances/ycmedia/backend/banner/service"
	"github.com/morgances/ycmedia/backend/base"
	"github.com/morgances/ycmedia/backend/base/constants"
)

type Controller struct {
	service *service.BannerService
}

func New(db *sql.DB) *Controller {
	return &Controller{
		service: service.NewBannerService(db),
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
			Name      string `json:"name"`
			ImagePath string `json:"path"`
			Event     string `json:"event"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrInvalidParam, "InvalidParam"))
	}

	id, err := con.service.Insert(req.Name, req.ImagePath, req.Event)
	if err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	logrus.Info("[create] ", req)

	return base.WriteStatusAndIDJSON(c, constants.ErrSucceed, id)
}

func (con *Controller) InfoById(c *server.Context) error {
	var (
		req struct {
			Id int `json:"id"`
		}
	)
	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, "InvalidParam")
	}

	ban, err := con.service.InfoById(req.Id)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, nil)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, ban)
}

func (con *Controller) DeleteById(c *server.Context) error {
	var (
		req struct {
			Id int `json:"id"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, "InvalidParam")
	}

	err := con.service.DeleteById(req.Id)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, nil)
	}

	logrus.Info("[delete]", req)
	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, nil)
}

func (con *Controller) ListBanner(c *server.Context) error {
	banners, err := con.service.ListBanner()
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, nil)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, banners)
}

func (con *Controller) Update(c *server.Context) error {
	var (
		req struct {
			Id        int    `json:"id"`
			Name      string `json:"name"`
			ImagePath string `json:"path"`
			Event     string `json:"event"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrInvalidParam, "InvalidParam"))
	}

	_, err := con.service.Update(req.Name, req.ImagePath, req.Event, req.Id)
	if err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	logrus.Info("[update]", req)
	return base.WriteStatusAndIDJSON(c, constants.ErrSucceed, req.Id)
}
