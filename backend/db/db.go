package db

import (
	"database/sql"
	"os"
	"sync"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var (
	db   *sql.DB
	once sync.Once
)

func InitDB() (*sql.DB, error) {

	err := godotenv.Load()
	if err != nil {
		return nil, err
	}
	var openErr error
	once.Do(func() {
		db, openErr = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	})
	return db, openErr
}

func GetDB() *sql.DB {
	return db
}
