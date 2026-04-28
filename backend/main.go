package main

import (
	"fmt"
	"os"

	"github.com/Stoukk/sample-project/backend/db"
	"github.com/Stoukk/sample-project/backend/handlers"
	"github.com/gin-gonic/gin"
)

func main() {

	// DB初期化
	_, err := db.InitDB()
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	// ルーティング
	r.POST("/login", handlers.Login)
	r.GET("/user/:id", handlers.Getuser)
	r.POST("/tasks", handlers.Createtask)
	r.GET("/tasks/:level", handlers.GetTasks)

	// React配信（必要なら）
	r.Static("/", "./frontend/build")
	r.NoRoute(func(c *gin.Context) {
		c.File("./frontend/build/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("server running on :" + port)
	r.Run(":" + port)
}
