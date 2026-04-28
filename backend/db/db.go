package db

import (
	"database/sql"
	"os"
	"sync"

	_ "github.com/lib/pq"
)

var (
	db   *sql.DB
	once sync.Once
)

func InitDB() (*sql.DB, error) {
	var err error
	once.Do(func() {
		db, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	})
	return db, err
}

func GetDB() *sql.DB {
	return db
}
