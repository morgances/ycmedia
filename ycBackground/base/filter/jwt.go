/*
 * Revision History:
 *     Initial: 2018/08/15        Shi Ruitao
 */

package filter

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/TechCatsLab/apix/http/server"
	log "github.com/TechCatsLab/logging/logrus"
	"github.com/TechCatsLab/sor/base"
	jwtgo "github.com/dgrijalva/jwt-go"
)

var (
	errInvalidToken = errors.New("jwt: invalid token")

	URLMap map[string]struct{}
)

type JWTFilter struct {
	token string
	db    *sql.DB
}

func init() {
	URLMap = make(map[string]struct{})
}

func New(token string) *JWTFilter {
	return &JWTFilter{token: token}
}

func NewAdminToken(userID uint32, tokenKey string) (string, error) {
	claims := make(jwtgo.MapClaims)
	claims["uid"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 480).Unix()
	token := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, claims)

	return token.SignedString([]byte(tokenKey))
}

func (f *JWTFilter) Check(ctx *server.Context) bool {
	c := &base.Context{ctx}

	claims, err := f.checkJWT(c)
	if err != nil {
		log.Error(err)
		return false
	}

	rawUID := uint32(claims[base.CtxKeyUID].(float64))
	c.SetUID(rawUID)

	return true
}

// checkJWT check whether the token is valid, it returns claims if valid.
func (f *JWTFilter) checkJWT(ctx *base.Context) (jwtgo.MapClaims, error) {
	var (
		err error
	)

	authString := ctx.Request().Header.Get("Authorization")
	kv := strings.Split(authString, " ")

	if len(kv) != 2 || kv[0] != "Bearer" {
		err = errors.New("invalid token authorization string")
		return nil, err
	}

	tokenString := kv[1]

	token, _ := jwtgo.Parse(tokenString, func(token *jwtgo.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwtgo.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(f.token), nil
	})

	claims, ok := token.Claims.(jwtgo.MapClaims)

	if !ok || !token.Valid {
		return nil, errInvalidToken
	}

	return claims, nil
}

func Skipper(path string) bool {
	if _, ok := URLMap[path]; ok {
		return true
	}

	return false
}
