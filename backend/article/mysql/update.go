package mysql

import (
	"fmt"
	"time"
)

func (d Database) UpdateArticleCategory(aid, newCategory int) error {
	return d.updateArticle(aid, fmt.Sprintf("category=%d", newCategory))
}

func (d Database) UpdateArticleTag(aid, newTag int) error {
	return d.updateArticle(aid, fmt.Sprintf("tag=%d", newTag))
}

func (d Database) UpdateArticleTitle(aid int, newTitle string) error {
	return d.updateArticle(aid, "title='"+newTitle+"'")
}

func (d Database) UpdateArticleAuthor(aid int, newAuthor string) error {
	return d.updateArticle(aid, "author='"+newAuthor+"'")
}

func (d Database) UpdateArticleDate(aid int, newTime time.Time) error {
	stmt, err := d.db.Prepare("update article set date=? where id=?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(newTime, aid)
	return err
}

func (d Database) UpdateArticleImage(aid int, newImage string) error {
	return d.updateArticle(aid, "image='"+newImage+"'")
}

func (d Database) UpdateArticleText(aid int, newText string) error {
	return d.updateArticle(aid, "text='"+newText+"'")
}

func (d Database) DIYUpdateArticle(opt string) error {
	_, err := d.db.Exec(UpdateArticle + opt)
	return err
}

func (d Database) updateArticle(aid int, opt string) error {
	_, err := d.db.Exec(UpdateArticle + opt + fmt.Sprintf(" where aid=%d", aid))
	return err
}
