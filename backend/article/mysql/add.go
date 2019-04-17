package mysql

import "time"

// Add Article
func (d Database) AddArticle(cat, tag, lab, uid int, title, author, image, text string, date time.Time) error {
	_, err := d.DB.Exec(InsertArticle, uid, cat, tag, lab, title, author, date, image, text)
	return err
}
