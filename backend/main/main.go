package main

import (
	"fmt"
	"time"

	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/apix/http/server/middleware"
	"github.com/TechCatsLab/logging/logrus"
	jwtgo "github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/morgances/ycmedia/backend/base/filter"
)

func main() {
	serverConfig := &server.Configuration{
		Address: "127.0.0.1:9573",
	}

	ep := server.NewEntrypoint(serverConfig, nil)
	ep.AttachMiddleware(middleware.NegroniRecoverHandler())
	// ep.AttachMiddleware(middleware.NegroniJwtHandler("UserTokenKey", nil, nil, nil))
	ep.AttachMiddleware(middleware.NegroniJwtHandler("AdminTokenKey", filter.Skipper, nil, nil))

	if err := ep.Start(router.Handler()); err != nil {
		logrus.Fatal(err)
	}

	admin, err := NewAdminToken(1)
	fmt.Println("admin: ", admin, err)

	ep.Wait()
}

// func NewUserToken(userID uint) (string, error) {
// 	claims := make(jwtgo.MapClaims)
// 	claims["uid"] = userID
// 	claims["exp"] = time.Now().Add(time.Hour * 480).Unix()
// 	token := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, claims)
// 	return token.SignedString([]byte("UserTokenKey"))
// }

//fixed to simple

func NewAdminToken(userID uint) (string, error) {
	token := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, jwtgo.MapClaims{
		"uid": userID,
		"exp": time.Now().Add(time.Hour * 480).Unix(), // 可以添加过期时间
	})

	return token.SignedString([]byte("AdminTokenKey")) //签名
}
