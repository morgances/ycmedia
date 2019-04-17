package mysql

import "time"

// Add Article
func (d Database) AddArticle(uid int, title, author, cat, tag, lab, image, text string, date time.Time) error {
	_, err := d.DB.Exec(InsertArticle, uid, cat, tag, lab, title, author, date, image, text)
	return err
}
