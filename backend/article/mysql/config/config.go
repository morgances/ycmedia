package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/url"
)

type MysqlConfigStruct struct {
	Host   string `json:"host"`
	Port   int    `json:"port"`
	User   string `json:"user"`
	Pass   string `json:"pass"`
	DBName string `json:"dbname"`
}

var MysqlDefaultConfig MysqlConfigStruct

func init() {
	data, err := ioutil.ReadFile("./mysql/config/config.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(data, &MysqlDefaultConfig)
	if err != nil {
		panic(err)
	}
}

func (mc MysqlConfigStruct) String() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?loc=%s&parseTime=true", mc.User, mc.Pass, mc.Host, mc.Port, mc.DBName, url.QueryEscape("Asia/Shanghai"))
}
