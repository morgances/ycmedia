package mysql

import (
	"errors"
	"fmt"
	"time"
)

/*
article:
  aid        int unsigned  auto_increment,
  category   int           not null,
  tag        int           not null,
  title      varchar(50)   not null,
  author     varchar(50)   not null,
  date       datetime      not null,
  image      varchar(255)  not null,
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
	return d.getArticle(fmt.Sprintf("where aid=%d", aid))
}

func (d Database) GetArticleByCategory(category int) ([]*Article, error) {
	return d.getArticle(fmt.Sprintf("where category=%d", category))
}

func (d Database) GetArticleByTag(tag int) ([]*Article, error) {
	return d.getArticle(fmt.Sprintf("where tag=%d", tag))
}

func (d Database) GetArticleByCategoryAndTag(category, tag int) ([]*Article, error) {
	return d.getArticle(fmt.Sprintf("where category=%d and tag=%d", category, tag))
}

func (d Database) GetArticleList(category, tag, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category=%d and tag=%d order by %s limit %d, %d", category, tag, order, start, nums))
}

func (d Database) GetArticleListDesc(category, tag, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category=%d and tag=%d order by %s desc limit %d, %d", category, tag, order, start, nums))
}

func (d Database) GetArticleByAuthor(author string) ([]*Article, error) {
	return d.getArticle("where author='" + author + "'")
}

func (d Database) GetArticleLimits(start, nums int) ([]*Article, error) {
	return d.getArticle(fmt.Sprintf("limit %d, %d", start, nums))
}

func (d Database) GetArticleOrderLimits(order string, desc bool, start, nums int) ([]*Article, error) {
	str := ""
	if desc {
		str = "desc"
	}
	return d.getArticle(fmt.Sprintf("order by %s %s limit %d, %d", order, str, start, nums))
}

func (d Database) DIYGetArticle(opt string) ([]*Article, error) {
	return d.getArticle(opt)
}

func (d Database) getArticle(opt string) ([]*Article, error) {
	list := make([]*Article, 0, 1)
	rows, err := d.db.Query(SelectArticle + opt)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var x = &Article{}
		err = rows.Scan(&x.Aid, &x.Uid, &x.Category, &x.Tag, &x.Title, &x.Author, &x.Date, &x.Image, &x.Text)
		if err != nil {
			return nil, err
		}
		list = append(list, x)
	}
	if len(list) == 0 {
		return nil, errors.New("No Articles !")
	}
	return list, nil
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
