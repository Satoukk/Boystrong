package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	// DB接続
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	// サーバー
	r := gin.Default()

	// React配信
	r.Static("/", "./frontend/build")

	r.NoRoute(func(c *gin.Context) {
		c.File("./frontend/build/index.html")
	})

	// 起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("server running on :" + port)
	r.Run(":" + port)
}
