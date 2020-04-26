package main

import (
	"fmt"
	"github.com/morgances/ycmedia/backend/base"
)

func main (){

	var admin = "admin"
	fmt.Println(base.SaltHashGenerate(&admin))
}
