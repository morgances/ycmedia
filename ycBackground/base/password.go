/*
 * Revision History:
 *     Initial: 2018/08/24        Shi Ruitao
 */

package base

import (
	"golang.org/x/crypto/bcrypt"
)

func SaltHashGenerate(password *string) (string, error) {
	hex := []byte(*password)
	hashedPassword, err := bcrypt.GenerateFromPassword(hex, 10)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func SaltHashCompare(digest []byte, password *string) bool {
	hex := []byte(*password)
	if err := bcrypt.CompareHashAndPassword(digest, hex); err == nil {
		return true
	}
	return false
}
