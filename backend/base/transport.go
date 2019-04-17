package base

import (
	"fmt"
	"log"
	"net/http"
	"net/url"

	json "github.com/json-iterator/go"
)

func Transport(req *http.Request) (int, string) {
	fmt.Printf("Received request %s %s %s\n", req.Method, req.Host, req.RemoteAddr)

	transport := http.DefaultTransport

	// step 1
	outReq := new(http.Request)
	*outReq = *req // this only does shallow copies of maps
	var err error
	// step 2
	outReq.URL, err = url.Parse("http://localhost:9573/api/v1/user/upload")
	if err != nil {
		log.Println(err)
		return 0, "0"
	}

	res, err := transport.RoundTrip(outReq)
	if err != nil {
		log.Println(err)
		return 0, "0"
	}

	// step 3
	var resp struct {
		Status int    `json:"status"`
		Data   string `json:"data"`
	}
	json.NewDecoder(res.Body).Decode(&resp)

	res.Body.Close()
	return resp.Status, resp.Data

}
