package mysql

import (
	"database/sql"
	"errors"
	"time"
)

var (
	errInvalidInsert = errors.New("insert banner:insert affected 0 rows")
)

type Banner struct {
	BannerId  int
	Name      string
	ImagePath string
	Event     string
	StartDate time.Time
	EndDate   time.Time
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
func InsertBanner(db *sql.DB, insert string, name string, imagepath string, event string, StartDate time.Time, EndDate time.Time) (int, error) {
	result, err := db.Exec(insert, name, imagepath, event, StartDate, EndDate)
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

//return banner list which have valid date
func LisitValidBannerByUnixDate(db *sql.DB, query string, unixtime int64) ([]*Banner, error) {
	var (
		bans []*Banner

		bannerId  int
		name      string
		imagepath string
		eventpath string
		sdate     time.Time
		edate     time.Time
	)

	rows, err := db.Query(query, unixtime, unixtime)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&bannerId, &name, &imagepath, &eventpath, &sdate, &edate); err != nil {
			return nil, err
		}

		ban := &Banner{
			BannerId:  bannerId,
			Name:      name,
			ImagePath: imagepath,
			Event:     eventpath,
			StartDate: sdate,
			EndDate:   edate,
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
		if err := rows.Scan(&ban.BannerId, &ban.Name, &ban.ImagePath, &ban.Event, &ban.StartDate, &ban.EndDate); err != nil {
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
