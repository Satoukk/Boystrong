package main

import (
	"fmt"
	"os"

	"github.com/Stoukk/sample-project/backend/db"
	"github.com/Stoukk/sample-project/backend/handlers"
	"github.com/Stoukk/sample-project/backend/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {

	// DB初期化
	_, err := db.InitDB()
	if err != nil {
		panic(err)
	}

	r := gin.Default()
	// CORS設定
	middlewares.SetupCORS(r)

	// ルーティング
	r.POST("/api/login", handlers.Login)
	r.GET("/api/user/:id", handlers.Getuser)
	r.POST("/api/CreateUser", handlers.CreateUser)
	r.POST("/api/tasks", handlers.Createtask)
	r.GET("/api/tasks/:level", handlers.GetTasks)
	r.GET("/api/tasklist/:level", handlers.Tasklist)
	r.PUT("/api/user/:id", handlers.UpdateLevel)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("server running on :" + port)
	r.Run(":" + port)
}
