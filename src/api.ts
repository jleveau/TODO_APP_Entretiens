import { Express } from "express";

interface Todo {
    id: number;
    title: string;
    description: string;
}
const todoList: Todo[] = [];

export default function (app: Express) {

    app.get("/api/health", (req, res) => {
        res.json({
            status: "OK"
        })
    });

    app.post("/api/todo", (req, res) => {
        res.sendStatus(500);
    });

    app.get("/api/todo", (req, res) => {
        res.sendStatus(500);
    });

    app.get("/api/todo/:id", (req, res) => {
        res.sendStatus(500);
    });

}


