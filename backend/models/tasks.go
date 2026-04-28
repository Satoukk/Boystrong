package models

type Task struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Complete bool   `json:"complete"`
	Level    int    `json:"level"`
}
