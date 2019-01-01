package mysql

import "time"

const (
	ArticleTable              string = "article"
	InsertArticle             string = "insert into article(user_id, category, tag, title, author, date, image, text)values(?, ?, ?, ?, ?, ?, ?, ?)"
	SelectArticle             string = "select * from article "
	DeleteArticle             string = "delete from article "
	UpdateArticle             string = "update article set "
	CreateArticleTableCommand string = `
        create table if not exists article(
        aid      int unsigned  auto_increment,
        user_id  int           not null,
        category int           not null,
        tag      int           not null,
        title    varchar(128)  not null,
        author   varchar(128)  not null,
        date     datetime      not null,
        image    varchar(256)  not null,
        text     TEXT          not null,
        primary key(aid))
        engine=InnoDB default charset=utf8`
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
