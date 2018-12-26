/*
 * Revision History:
 *     Initial: 2018/08/14        Shi Ruitao
 */

package constants

const (
	// UserID - user id
	UserID = "id"
	// InvalidUID - userID invalid
	InvalidUID = 0
	// Inactive - user inactive
	Inactive = false

	// RespKeyStatus - json key 'status'
	RespKeyStatus = "status"
	// RespKeyData - json key 'data'
	RespKeyData = "data"
	// RespKeyID - json key 'ID'
	RespKeyID = "ID"

	// fileKry - key of the file
	FileKey = "file"

	//FileUploadDir - the root directory of the upload files
	FileUploadDir = "files"

	//ArticleDir - save article file
	ArticleDir = "article"
	// PictureDir - save pictures file
	PictureDir = "picture"
	// VideoDir - save videos file
	VideoDir = "video"
	// OtherDir - files other than video and picture
	OtherDir = "other"

	//module ErrCode
	ErrSucceed                = 0
	ErrCreateInMysql          = 233
	ErrOprationInMysql        = 234
	ErrInvalidParam           = 421
	ErrListChirdrenByParentID = 777
)
