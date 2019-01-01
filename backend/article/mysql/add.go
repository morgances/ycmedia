package mysql

import "time"

// Add Article
func (d Database) AddArticle(cat, tag, uid int, title, author, image, text string, date time.Time) error {
	_, err := d.db.Exec(InsertArticle, uid, cat, tag, title, author, date, image, text)
	return err
}
