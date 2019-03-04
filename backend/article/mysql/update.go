package mysql

import (
	"database/sql"
	"errors"
	"fmt"
	"time"
)

func (d Database) UpdateArticle(aid int, keyValStr string, date *time.Time) error {
	var (
		res sql.Result
		err error
	)

	if date == nil {
		res, err = d.DB.Exec(UpdateArticle + keyValStr + fmt.Sprintf(" where aid=%d", aid))
	} else {
		res, err = d.DB.Exec(UpdateArticle+keyValStr+fmt.Sprintf(" where aid=%d", aid), *date)
	}

	if err != nil {
		return err
	}

	affected, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if affected == 0 {
		return errors.New("No Such Article !")
	}

	return nil
}
