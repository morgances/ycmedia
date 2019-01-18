package mysql

import (
	"errors"
	"fmt"
)

func (d Database) UpdateArticle(aid int, keyValStr string) error {
	res, err := d.DB.Exec(UpdateArticle + keyValStr + fmt.Sprintf(" where id=%d", aid))
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
