/*
 * Revision History:
 *     Initial: 2018/08/18        Feng Yifei
 */

package main

import (
	"github.com/TechCatsLab/apix/http/server"
	"github.com/TechCatsLab/apix/http/server/middleware"
	"github.com/TechCatsLab/logging/logrus"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	serverConfig := &server.Configuration{
		Address: "127.0.0.1:9573",
	}

	ep := server.NewEntrypoint(serverConfig, nil)
	ep.AttachMiddleware(middleware.NegroniRecoverHandler())
	//ep.AttachMiddleware(middleware.NegroniJwtHandler("UserTokenKey", nil, nil, nil))
	//ep.AttachMiddleware(middleware.NegroniJwtHandler("AdminTokenKey", filter.Skipper, nil, nil))

	if err := ep.Start(router.Handler()); err != nil {
		logrus.Fatal(err)
	}

	/*user, err := NewUserToken(1)
	fmt.Println("user: ", user, err)
	*/
	ep.Wait()
}

/*
func NewUserToken(userID uint) (string, error) {
	claims := make(jwtgo.MapClaims)
	claims["uid"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 480).Unix()
	token := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, claims)

	return token.SignedString([]byte("UserTokenKey"))
}
*/
