/*
 * Revision History:
 *     Initial: 2018/08/24        Shi Ruitao
 */

package mysql

import (
	"database/sql"
	"errors"

	"github.com/TechCatsLab/sor/base"
	"github.com/TechCatsLab/sor/base/constants"
)

type (
	AdminserviceProvider struct {}
)

const (
	mysqlAdminCreateDatabase = iota
	mysqlUserCreateTable
	mysqlUserInsert
	mysqlUserLogin
	mysqlUserModifyEmail
	mysqlUserModifyMobile
	mysqlUserGetPwd
	mysqlUserModifyPwd
	mysqlUserModifyActive
	mysqlUserGetIsActive
)

var (
	AdminServer *AdminserviceProvider

	errInvalidMysql = errors.New("affected 0 rows")
	errLoginFailed  = errors.New("invalid username or password")
	ErrNoRows       = errors.New("there is no such data in database")

	adminSqlString = []string{
		`CREATE DATABASE IF NOT EXISTS admin`,
		`CREATE TABLE IF NOT EXISTS admin.user (
			id 	        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			name		VARCHAR(512) UNIQUE NOT NULL DEFAULT ' ',
			pwd			VARCHAR(512) NOT NULL DEFAULT ' ',
			real_name	VARCHAR(512) NOT NULL DEFAULT ' ',
			mobile		VARCHAR(32) UNIQUE NOT NULL,
			email		VARCHAR(128) UNIQUE DEFAULT NULL,
			active		BOOLEAN DEFAULT TRUE,
			created_at 	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;`,
		`INSERT INTO admin.user(name,pwd,real_name,mobile,email,active) VALUES (?,?,?,?,?,?)`,
		`SELECT id,pwd FROM admin.user WHERE name = ? AND active=true LOCK IN SHARE MODE`,
		`UPDATE admin.user SET email=? WHERE id = ? LIMIT 1`,
		`UPDATE admin.user SET mobile=? WHERE id = ? LIMIT 1`,
		`SELECT pwd FROM admin.user WHERE id = ? AND active = true LOCK IN SHARE MODE`,
		`UPDATE admin.user SET pwd = ? WHERE id = ? LIMIT 1`,
		`UPDATE admin.user SET active = ? WHERE id = ? LIMIT 1`,
		`SELECT active FROM admin.user WHERE id = ? LOCK IN SHARE MODE`,
	}
)

// CreateDatabase create database admin.
func CreateDatabase(db *sql.DB) error {
	_, err := db.Exec(adminSqlString[mysqlAdminCreateDatabase])
	return err
}

// CreateTable create admin.user table.
func CreateTable(db *sql.DB) error {
	_, err := db.Exec(adminSqlString[mysqlUserCreateTable])
	return err
}

// CreateAdmin create a new user account.
func (*AdminserviceProvider) Create(db *sql.DB, name, pwd, realName, mobile, email *string) error {
	hash, err := base.SaltHashGenerate(pwd)
	if err != nil {
		return err
	}

	result, err := db.Exec(adminSqlString[mysqlUserInsert], name, hash, realName, mobile, email, true)
	if err != nil {
		return err
	}
	if rows, _ := result.RowsAffected(); rows == 0 {
		return errInvalidMysql
	}

	return nil
}

// Login return user id and nil if login success.
func (*AdminserviceProvider) Login(db *sql.DB, name, pwd *string) (uint32, error) {
	var (
		id       uint32
		password string
	)

	err := db.QueryRow(adminSqlString[mysqlUserLogin], name).Scan(&id, &password)
	if err != nil {
		return constants.InvalidUID, err
	}

	if !base.SaltHashCompare([]byte(password), pwd) {
		return 0, errLoginFailed
	}

	return id, nil
}

// AddEmail modify user email.
func (*AdminserviceProvider) ModifyEmail(db *sql.DB, id uint32, email *string) error {
	result, err := db.Exec(adminSqlString[mysqlUserModifyEmail], email, id)
	if err != nil {
		return err
	}
	if rows, _ := result.RowsAffected(); rows == 0 {
		return errInvalidMysql
	}

	return nil
}

// AddMobile modify user mobile.
func (*AdminserviceProvider) ModifyMobile(db *sql.DB, id uint32, mobile *string) error {
	result, err := db.Exec(adminSqlString[mysqlUserModifyMobile], mobile, id)
	if err != nil {
		return err
	}
	if rows, _ := result.RowsAffected(); rows == 0 {
		return errInvalidMysql
	}

	return nil
}

// ModifyPwd modify user password.
func (*AdminserviceProvider) ModifyPwd(db *sql.DB, id uint32, pwd, newPwd *string) error {
	var (
		password string
	)
	err := db.QueryRow(adminSqlString[mysqlUserGetPwd], id).Scan(&password)
	if err != nil {
		return err
	}

	if !base.SaltHashCompare([]byte(password), pwd) {
		return errLoginFailed
	}

	hash, err := base.SaltHashGenerate(newPwd)
	if err != nil {
		return err
	}

	_, err = db.Exec(adminSqlString[mysqlUserModifyPwd], hash, id)

	return err
}

func (*AdminserviceProvider) ModifyActive(db *sql.DB, id uint32, active bool) error {
	result, err := db.Exec(adminSqlString[mysqlUserModifyActive], active, id)
	if err != nil {
		return err
	}
	if rows, _ := result.RowsAffected(); rows == 0 {
		return errInvalidMysql
	}

	return nil
	
}

//IsActive return user.Active and nil if query success.
func (*AdminserviceProvider) IsActive(db *sql.DB, id uint32) (bool, error) {
	var (
		isActive bool
	)

	err := db.QueryRow(adminSqlString[mysqlUserGetIsActive], id).Scan(&isActive)
	return isActive, err
}
