package models

type Task struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
	Level int    `json:"level"`
}
