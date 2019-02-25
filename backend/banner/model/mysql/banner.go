package mysql

import (
	"database/sql"
	"errors"
)

var (
	errInvalidInsert = errors.New("insert banner:insert affected 0 rows")
)

type Banner struct {
	BannerId  int
	Name      string
	ImagePath string
	Event     string
}

func CreateDB(db *sql.DB, createDB string) error {
	_, err := db.Exec(createDB)
	return err
}

func CreateTable(db *sql.DB, createTable string) error {
	_, err := db.Exec(createTable)
	return err
}

//return  id
//have default value like nowtime and deadline
func InsertBanner(db *sql.DB, insert string, name string, imagepath string, event string) (int, error) {
	result, err := db.Exec(insert, name, imagepath, event)
	if err != nil {
		return 0, err
	}

	if affected, _ := result.RowsAffected(); affected == 0 {
		return 0, errInvalidInsert
	}

	bannerId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(bannerId), nil
}

//return banner list
func ListBanner(db *sql.DB, query string) ([]*Banner, error) {
	var (
		bans []*Banner

		bannerId  int
		name      string
		imagepath string
		eventpath string
	)

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&bannerId, &name, &imagepath, &eventpath); err != nil {
			return nil, err
		}

		ban := &Banner{
			BannerId:  bannerId,
			Name:      name,
			ImagePath: imagepath,
			Event:     eventpath,
		}
		bans = append(bans, ban)
	}

	return bans, nil
}

//query by id
func InfoById(db *sql.DB, query string, id int) (*Banner, error) {
	var ban Banner

	rows, err := db.Query(query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		if err := rows.Scan(&ban.BannerId, &ban.Name, &ban.ImagePath, &ban.Event); err != nil {
			return nil, err
		}
	}
	return &ban, nil
}

//delete by id
func DeleteById(db *sql.DB, delete string, id int) error {
	_, err := db.Exec(delete, id)
	return err
}

func UpdateByID(db *sql.DB, update string, name, imagePath, event string, id int) (int, error) {
	result, err := db.Exec(update, name, imagePath, event, id)
	if err != nil {
		return 0, err
	}

	bannerId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(bannerId), nil
}
