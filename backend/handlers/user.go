package handlers

import (
	"net/http"

	"github.com/Stoukk/sample-project/backend/db"
	"github.com/Stoukk/sample-project/backend/models"
	"github.com/gin-gonic/gin"
)

// ログインAPI
func Login(c *gin.Context) {

	var req models.User
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}

	var id int
	var name string
	var email string
	var password string
	var level int

	err := dbConn.QueryRow("SELECT id, name, email, password, level FROM users WHERE email = $1", req.Email).Scan(&id, &name, &email, &password, &level)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if req.Password != password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "login success", "user": gin.H{"id": id, "name": name, "email": email, "level": level}})
}

// ユーザー情報取得API
func Getuser(c *gin.Context) {
	id := c.Param("id")
	var name string
	var email string
	var level int

	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}

	err := dbConn.QueryRow("select name, email, level from users where id = $1", id).Scan(&name, &email, &level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":    id,
		"name":  name,
		"email": email,
		"level": level,
	})
}

// ユーザー作成
func CreateUser(c *gin.Context) {
	var req models.User
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}
	var id int
	err := dbConn.QueryRow(
		"INSERT INTO users (name, email, password, level) VALUES ($1, $2, $3, $4) RETURNING id", req.Name, req.Email, req.Password, 1).Scan(&id)
	if err != nil {
		// エラー内容を詳細に返す（開発用）
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user created", "user": gin.H{"id": id, "name": req.Name, "email": req.Email, "level": 1}})

}
