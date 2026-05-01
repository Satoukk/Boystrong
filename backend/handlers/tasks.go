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

	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}

	var title string
	var complete bool
	var level int

	err := dbConn.QueryRow("insert into task (title, complete, level) values ($1, $2, $3) returning title, complete, level", req.Title, false, req.Level).Scan(&title, &complete, &level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "task created", "task": gin.H{"title": title, "complete": complete, "level": level}})

}

// レベル別タスク取得API
func GetTasks(c *gin.Context) {
	level := c.Param("level")
	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}
	rows, err := dbConn.Query("select * from task where level = $1", level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
		return
	}
	for rows.Next() {
		var id int
		var title string
		var complete bool
		var level int
		err := rows.Scan(&id, &title, &complete, &level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "task found", "task": gin.H{"id": id, "title": title, "complete": complete, "level": level}})
	}
}

func Tasklist(c *gin.Context) {
	level := c.Param("level")
	dbConn := db.GetDB()
	if dbConn == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db not initialized"})
		return
	}
	rows, err := dbConn.Query("select * from task where level = $1", level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
		return
	}
	var tasks []models.Task
	for rows.Next() {
		var id int
		var title string
		var level int
		err := rows.Scan(&id, &title, &level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
			return
		}
		tasks = append(tasks, models.Task{Id: id, Title: title, Level: level})
	}
	c.JSON(http.StatusOK, gin.H{"message": "tasks found", "tasks": tasks})
}
