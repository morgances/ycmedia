/*
 * Revision History:
 *     Initial: 2018/08/14        Shi Ruitao
 */

package http

import (
	"crypto/md5"
	"encoding/hex"
	"os"

	"github.com/morgances/ycmedia/backend/base/constants"
)

var (
	fileMap = map[string]string{}

	picture = []string{".jpg", ".png", ".jpeg", ".gif", ".bmp"}
	video   = []string{".avi", ".wmv", ".mpg", ".mpeg", ".mpe", ".mov", ".rm", ".ram", ".swf", ".mp4", ".rmvb", ".asf", ".divx", ".vob"}
	fileDir = filePath()
)

func filePath() map[string]string {
	for _, suffix := range picture {
		fileMap[suffix] = constants.PictureDir
	}
	for _, suffix := range video {
		fileMap[suffix] = constants.VideoDir
	}
	return fileMap
}

func classifyBySuffix(suffix string) string {

	if dir := fileDir[suffix]; dir != "" {
		return dir
	}
	return constants.OtherDir
}

func MD5(file []byte) (string, error) {
	sum := md5.New()
	_, err := sum.Write(file)
	if err != nil {
		return "", err
	}

	MD5Str := hex.EncodeToString(sum.Sum(nil))
	return MD5Str, nil
}

func CopyFile(path string, file []byte) error {
	cur, err := os.Create(path)
	defer cur.Close()
	if err != nil {
		return err
	}

	_, err = cur.Write(file)
	return err
}
