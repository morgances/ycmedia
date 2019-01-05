package mysql

import "fmt"

// Delete Article
func (d Database) DeleteArticle(aid int) error {
	_, err := d.DB.Exec(DeleteArticle + fmt.Sprintf("where aid=%d", aid))
	return err
}
