package mysql

import (
	"fmt"
	"time"
)

/*
article:
  aid        int unsigned  auto_increment,
  user_id    int           not null,
  category   int           not null,
  tag        int           not null,
  title      varchar(128)  not null,
  author     varchar(128)  not null,
  date       datetime      not null,
  image      varchar(256)  not null,
  text       TEXT          not null,
*/

type Article struct {
	Aid      int       `json:"aid"`
	Uid      int       `json:"user_id"`
	Category int       `json:"category"`
	Tag      int       `json:"tag"`
	Title    string    `json:"title"`
	Author   string    `json:"author"`
	Date     time.Time `json:"date"`
	Image    string    `json:"image"`
	Text     string    `json:"text"`
}

// Create Article Table
func (d Database) CreateArticleTable() error {
	_, err := d.db.Exec(CreateArticleTableCommand)
	return err
}

// Add Article
func (d Database) AddArticle(cat, tag, uid int, title, author, image, text string, date time.Time) error {
	_, err := d.db.Exec(InsertArticle, uid, cat, tag, title, author, date, image, text)
	return err
}

// Get Article
func (d Database) GetArticleById(aid int) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where aid=%d", aid))
}

func (d Database) GetArticleList(category, tag, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category=%d and tag=%d order by %s limit %d, %d", category, tag, order, start, nums))
}

func (d Database) GetArticleListDesc(category, tag, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category=%d and tag=%d order by %s desc limit %d, %d", category, tag, order, start, nums))
}

func (d Database) GetArticleByDate(category, tag int, date time.Time) ([]*Article, error) {
	rows, err := d.db.Query(SelectArticle+"where category=? and tag=? and date > ? order by date desc", category, tag, date)
	if err != nil {
		return nil, err
	}
	return rowsToArticles(rows)
}

func (d Database) GetArticleOrderLimits(order string, desc bool, start, nums int) ([]*Article, error) {
	str := ""
	if desc {
		str = "desc"
	}
	return d.DIYGetArticle(fmt.Sprintf("order by %s %s limit %d, %d", order, str, start, nums))
}

func (d Database) DIYGetArticle(opt string) ([]*Article, error) {
	rows, err := d.db.Query(SelectArticle + opt)
	if err != nil {
		return nil, err
	}
	return rowsToArticles(rows)
}

// Delete Article
func (d Database) DeleteArticle(aid int) error {
	_, err := d.db.Exec(DeleteArticle + fmt.Sprintf("where aid=%d", aid))
	return err
}

// Update Article
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
