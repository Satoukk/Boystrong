package models

type Task struct {
	id       int    `json:"id"`
	title    string `json:"title"`
	complete bool   `json:"complete"`
	level    int    `json:"level"`
}
