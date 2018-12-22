/*
 * Revision History:
 *     Initial: 2018/08/13        Shi Ruitao
 */

package base

import (
	"database/sql"
)

type Controller struct {
	db *sql.DB
}

func New(db *sql.DB) *Controller {
	return &Controller{
		db: db,
	}
}

func (c *Controller) SQLStore() *sql.DB {
	return c.db
}
