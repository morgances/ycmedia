package controller

import (
	"database/sql"
	"net/http"
	"time"

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
	if c.Request().Method != "POST" {
		logrus.Error("Error In Request: NotPost")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only post"))
	}

	var (
		req struct {
			Name      string    `json:"name"`
			ImagePath string    `json:"path"`
			Event     string    `json:"event"`
			StartDate time.Time `json:"start"`
			EndDate   time.Time `json:"end"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(constants.ErrInvalidParam, "InvalidParam"))
	}

	id, err := con.service.Insert(req.Name, req.ImagePath, req.Event, req.StartDate, req.EndDate)
	if err != nil {
		logrus.Error(err)
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, err))
	}

	return base.WriteStatusAndIDJSON(c, constants.ErrSucceed, id)
}

func (con *Controller) LisitValidBannerByUnixDate(c *server.Context) error {
	if c.Request().Method != "POST" {
		logrus.Error("Error In Request: NotPost")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only post"))
	}

	var (
		req struct {
			Unixtime int64 `json:"unixtime"`
		}
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, "InvalidParam")
	}

	banners, err := con.service.LisitValidBannerByUnixDate(req.Unixtime)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, err)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, banners)
}

func (con *Controller) InfoById(c *server.Context) error {
	if c.Request().Method != "POST" {
		logrus.Error("Error In Request: NotPost")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only post"))
	}

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
	if c.Request().Method != "POST" {
		logrus.Error("Error In Request: NotPost")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only post"))
	}

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

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, nil)

}

func (con *Controller) ListBanner(c *server.Context) error {
	if c.Request().Method != "GET" {
		logrus.Error("Error In Request: NotGet")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only Get"))
	}

	banners, err := con.service.ListBanner()
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, nil)
	}

	return base.WriteStatusAndDataJSON(c, constants.ErrSucceed, banners)
}

func (con *Controller) ListPage(c *server.Context) error {
	if c.Request().Method != "POST" {
		logrus.Error("Error In Request: NotPost")
		return c.ServeJSON(base.RespStatusAndData(http.StatusBadRequest, "only post"))
	}

	var (
		req struct {
			Page int `json:"page"`
		}
		pages int
	)

	if err := c.JSONBody(&req); err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, constants.ErrInvalidParam, "InvalidParam")
	}

	banners, err := con.service.ListPage(req.Page - 1)
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, err)
	}

	total, err := con.service.Total()
	if err != nil {
		logrus.Error(err)
		return base.WriteStatusAndDataJSON(c, http.StatusBadRequest, err)
	}

	if total%10 != 0 {
		pages = total/10 + 1
	} else {
		pages = total / 10
	}

	return base.WriteStatusAndPageJSON(c, constants.ErrSucceed, banners, req.Page, total, pages)
}
