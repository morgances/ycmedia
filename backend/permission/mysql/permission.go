/*
 * Revision History:
 *     Initial: 2018/08/26        Shi Ruitao
 */

package mysql

import (
	"database/sql"
	"time"
)

const (
	mysqlPermissionCreateTable = iota
	mysqlPermissionInstert
	mysqlPermissionDelete
	mysqlPermissonGetRole
	mysqlPermissonGetAll
)

type (
	permission struct {
		Url       string
		RoleID    uint32
		CreatedAt time.Time
	}
)

var (
	permissionSqlString = []string{
		`CREATE TABLE IF NOT EXISTS admin.permission (
			url			VARCHAR(512) NOT NULL DEFAULT ' ',
			role_id		MEDIUMINT UNSIGNED NOT NULL,
			created_at 	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (url,role_id)
		) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;`,
		`INSERT INTO admin.permission(url,role_id) VALUES (?,?)`,
		`DELETE FROM admin.permission WHERE role_id = ? AND url = ? LIMIT 1`,
		`SELECT permission.role_id FROM admin.permission, admin.role WHERE permission.url = ? AND role.active = true AND permission.role_id = role.id LOCK IN SHARE MODE`,
		`SELECT * FROM admin.permission LOCK IN SHARE MODE`,
	}
)

// CreatePermissionTable create permission table.
func CreatePermissionTable(db *sql.DB) error {
	_, err := db.Exec(permissionSqlString[mysqlPermissionCreateTable])
	return err
}

// AddPermission create an associated record of the specified URL and role.
func (sp *ServiceProvider) AddURLPermission(db *sql.DB, rid uint32, url string) error {
	role, err := sp.GetRoleByID(db, rid)
	if err != nil {
		return err
	}

	if !role.Active {
		return errRoleInactive
	}

	_, err = db.Exec(permissionSqlString[mysqlPermissionInstert], url, rid)
	return nil
}

// RemovePermission remove the associated records of the specified URL and role.
func (sp *ServiceProvider) RemoveURLPermission(db *sql.DB, rid uint32, url string) error {
	role, err := sp.GetRoleByID(db, rid)
	if err != nil {
		return err
	}

	if !role.Active {
		return errRoleInactive
	}

	_, err = db.Exec(permissionSqlString[mysqlPermissionDelete], rid, url)
	return err
}

// URLPermissions lists all the roles of the specified URL.
func (*ServiceProvider) URLPermissions(db *sql.DB, url string) (map[uint32]bool, error) {
	var (
		roleID uint32
		result = make(map[uint32]bool)
	)

	rows, err := db.Query(permissionSqlString[mysqlPermissonGetRole], url)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err = rows.Scan(&roleID); err != nil {
			return nil, err
		}
		result[roleID] = true
	}
	return result, nil
}

// Permissions lists all the roles.
func (*ServiceProvider) Permissions(db *sql.DB) (*[]*permission, error) {
	var (
		roleID    uint32
		url       string
		createdAt time.Time

		result []*permission
	)

	rows, err := db.Query(permissionSqlString[mysqlPermissonGetAll])
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err = rows.Scan(&url, &roleID, &createdAt); err != nil {
			return nil, err
		}
		data := &permission{
			Url:       url,
			RoleID:    roleID,
			CreatedAt: createdAt,
		}
		result = append(result, data)
	}
	return &result, nil
}
