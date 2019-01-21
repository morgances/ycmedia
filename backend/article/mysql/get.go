package mysql

import (
	"fmt"
	"time"
)

func (d Database) GetArticleById(aid int) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where aid=%d", aid))
}

func (d Database) GetArticleListDesc(category, tag, label, start, nums int, order string) ([]*Article, error) {
	return d.DIYGetArticle(fmt.Sprintf("where category=%d and tag=%d and label=%d order by %s desc limit %d, %d", category, tag, label, order, start, nums))
}

func (d Database) GetArticleByDate(category, tag, label int, date time.Time) ([]*Article, error) {
	rows, err := d.DB.Query(SelectArticle+"where category=? and tag=? and label=? and date > ? order by date desc", category, tag, label, date)
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
	rows, err := d.DB.Query(SelectArticle + opt)
	if err != nil {
		return nil, err
	}
	return rowsToArticles(rows)
}
