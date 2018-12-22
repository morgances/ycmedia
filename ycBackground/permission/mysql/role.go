/*
 * Revision History:
 *     Initial: 2018/08/24        Shi Ruitao
 */

package mysql

import (
	"database/sql"
	"errors"
	"time"
)

type (
	ServiceProvider struct{}

	role struct {
		ID       uint32
		Name     string
		Intro    string
		Active   bool
		CreateAt time.Time
	}
)

const (
	mysqlRoleCreateTable = iota
	mysqlRoleInsert
	mysqlRoleModify
	mysqlRoleModifyActive
	mysqlRoleGetList
	mysqlRoleGetByID
)

var (
	Service *ServiceProvider
	errInvalidMysql = errors.New("affected 0 rows")

	roleSqlString = []string{
		`CREATE TABLE IF NOT EXISTS admin.role (
			id 	        INT UNSIGNED NOT NULL AUTO_INCREMENT,
			name		VARCHAR(512) UNIQUE NOT NULL DEFAULT ' ',
			intro		VARCHAR(512) NOT NULL DEFAULT ' ',
			active		BOOLEAN DEFAULT TRUE,
			created_at 	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;`,
		`INSERT INTO admin.role(name,intro,active) VALUES (?,?,?)`,
		`UPDATE admin.role SET name = ?,intro = ? WHERE id = ? LIMIT 1`,
		`UPDATE admin.role SET active = ? WHERE id = ? LIMIT 1`,
		`SELECT * FROM admin.role LOCK IN SHARE MODE`,
		`SELECT * FROM admin.role WHERE id = ? AND active = true LOCK IN SHARE MODE`,
	}
)

// CreateRoleTable create role table.
func CreateRoleTable(db *sql.DB) error {
	_, err := db.Exec(roleSqlString[mysqlRoleCreateTable])
	return err
}

// CreateRole create a new role information.
func (*ServiceProvider) CreateRole(db *sql.DB, name, intro string) error {
	result, err := db.Exec(roleSqlString[mysqlRoleInsert], name, intro, true)
	if err != nil {
		return err
	}
	if rows, _ := result.RowsAffected(); rows == 0 {
		return errInvalidMysql
	}

	return nil
}

// ModifyRole modify role information.
func (*ServiceProvider) ModifyRole(db *sql.DB, id uint32, name, intro string) error {
	_, err := db.Exec(roleSqlString[mysqlRoleModify], name, intro, id)

	return err
}

// ModifyRoleActive modify role active.
func (*ServiceProvider) ModifyRoleActive(db *sql.DB, id uint32, active bool) error {
	_, err := db.Exec(roleSqlString[mysqlRoleModifyActive], active, id)

	return err
}

// RoleList get all role information.
func (*ServiceProvider) RoleList(db *sql.DB) (*[]*role, error) {
	var (
		id       uint32
		name     string
		intro    string
		active   bool
		createAt time.Time
		roles    []*role
	)
	rows, err := db.Query(roleSqlString[mysqlRoleGetList])
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&id, &name, &intro, &active, &createAt); err != nil {
			return nil, err
		}

		r := &role{
			ID:       id,
			Name:     name,
			Intro:    intro,
			Active:   active,
			CreateAt: createAt,
		}

		roles = append(roles, r)
	}

	return &roles, nil
}

// GetRoleByID get role by id.
func (*ServiceProvider) GetRoleByID(db *sql.DB, id uint32) (*role, error) {
	var (
		r role
	)
	err := db.QueryRow(roleSqlString[mysqlRoleGetByID], id).Scan(&r.ID, &r.Name, &r.Intro, &r.Active, &r.CreateAt)
	return &r, err
}
