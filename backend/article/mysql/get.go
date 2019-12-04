package mysql

import (
	"fmt"
	"time"
)

func (d Database) GetAll(k, v string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where %s='%s'", k, v))
}

func (d Database) GetArticleById(aid int) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where aid=%d", aid))
}

func (d Database) GetArticleListDesc(category, tag, label string, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category='%s' and tag='%s' and label='%s' order by %s desc limit %d, %d", category, tag, label, order, start, nums))
}

func (d Database) GetArticleByDate(category, tag, label string, date time.Time) ([]*Article, error) {
	rows, err := d.DB.Query(SelectArticle+"where category=? and tag=? and label=? and date > ? order by date desc", category, tag, label, date)
	if err != nil {
		return nil, err
	}
	return rowsToArticles(rows)
}

func (d Database) GetArticleAndPageCount(category, tag, label string) (articleCount int, pageCount int, err error) {
	rows, err := d.DB.Query("select count(*) from article.article where category=? and tag=? and label=?", category, tag, label)
	if err != nil {
		return
	}

	for rows.Next() {
		err = rows.Scan(&articleCount)
		if err != nil {
			return
		}
	}
	pageCount = (articleCount + 9) / 10
	return
}

func (d Database) GetArticleOrderLimits(order string, desc bool, start, nums int) ([]*Article, error) {
	str := ""
	if desc {
		str = "desc"
	}
	return d.DIYGetArticle(fmt.Sprintf("order by %s %s limit %d, %d", order, str, start, nums))
}

func (d Database) DIYGetArticle(opt string) ([]*Article, error) {
	rows, err := d.DB.Query(SelectArticle + opt)
	if err != nil {
		return nil, err
	}
	return rowsToArticles(rows)
}
