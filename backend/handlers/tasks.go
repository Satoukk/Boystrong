package handlers

import (
	"net/http"

	"github.com/Stoukk/sample-project/backend/db"
	"github.com/Stoukk/sample-project/backend/models"
	"github.com/gin-gonic/gin"
)

// タスク作成API
func Createtask(c *gin.Context) {
	var req models.Task
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	if req.Level < 1 || req.Level > 5 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "level must be between 1 and 5"})
		return
	}

	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}

	var id int
	err := dbConn.QueryRow("insert into tasks (title, level) values ($1, $2) returning id", req.Title, req.Level).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "task created", "task": gin.H{"id": id, "title": req.Title, "level": req.Level}})

}

// レベル別タスク取得API
func GetTasks(c *gin.Context) {
	level := c.Param("level")
	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}
	rows, err := dbConn.Query("select * from tasks where level = $1", level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	for rows.Next() {
		var id int
		var title string
		var level int
		err := rows.Scan(&id, &title, &level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "task found", "task": gin.H{"id": id, "title": title, "level": level}})
	}
}

func Tasklist(c *gin.Context) {
	level := c.Param("level")
	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}
	rows, err := dbConn.Query("select * from tasks where level = $1", level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var tasks []models.Task
	for rows.Next() {
		var id int
		var title string
		var level int
		err := rows.Scan(&id, &title, &level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		tasks = append(tasks, models.Task{Id: id, Title: title, Level: level})
	}
	c.JSON(http.StatusOK, gin.H{"message": "task found", "tasks": tasks})
}
