import Server from '../src/server';

const port = Number(process.env.PORT) || 3000;

describe("Server", () => {
    let server: Server;

    beforeAll(() => {
        server = new Server(port);
        return server.start();
    });

    afterAll(() => {
        return server.close();
    });


    describe("POST /api/todo", () => {

        it("should create a new todo", async () => {
            const response = await fetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My first todo",
                    description: "This is my first todo"
                })
            });
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.id).toBeDefined();
            expect(json.title).toBe("My first todo");
            expect(json.description).toBe("This is my first todo");
        });

        it("should fail to create a todo with no title", async () => {
            const response = await fetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: "This is my second todo"
                })
            });
            expect(response.ok).toBe(false);
            expect(response.status).toBe(400);
            expect(response.statusText).toBe("Bad Request");
            const test = await response.text();
            expect(test).toBe("title is required for todo");
        });

        it("should successfully create a second todo with no description", async () => {
            const response = await fetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My second todo"
                })
            });
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.id).toBeDefined();
            expect(json.title).toBe("My second todo");
            expect(json.description).toBeUndefined();
        });
    });

    describe("GET /api/todo", () => {

        it("should return the list of todos", async () => {
            const response = await fetch("http://localhost:3000/api/todo");
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.length).toBe(2);
        });

    });

    describe("GET /api/todo/:id", () => {

        it("should return a todo", async () => {
            const response = await fetch("http://localhost:3000/api/todo/1");
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.id).toBe(1);
            expect(json.title).toBe("My first todo");
            expect(json.description).toBe("This is my first todo");
        });

    });

    describe("DELETE /api/todo/:id", () => {

        it("should delete a todo", async () => {
            const response = await fetch("http://localhost:3000/api/todo/1", {
                method: "DELETE"
            });
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.id).toBe(1);
            expect(json.title).toBe("My first todo");
            expect(json.description).toBe("This is my first todo");
        });

        it("should fail to delete a todo that does not exist", async () => {
            const response = await fetch("http://localhost:3000/api/todo/1", {
                method: "DELETE"
            });
            expect(response.ok).toBe(false);
            expect(response.status).toBe(404);
            expect(response.statusText).toBe("Not Found");
            const test = await response.text();
            expect(test).toBe("todo not found");
        });

        it("should return the list of todos", async () => {
            const response = await fetch("http://localhost:3000/api/todo");
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.length).toBe(1);
        });
    });

    describe("PUT /api/todo/:id", () => {

        it("should update a todo", async () => {
            const response = await fetch("http://localhost:3000/api/todo/2", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My updated todo",
                    description: "This is my updated todo"
                })
            });
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.id).toBe(2);
            expect(json.title).toBe("My updated todo");
            expect(json.description).toBe("This is my updated todo");
        })

        it("should fail to update a todo that does not exist", async () => {
            const response = await fetch("http://localhost:3000/api/todo/3", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My updated todo",
                    description: "This is my updated todo"
                })
            });
            expect(response.ok).toBe(false);
            expect(response.status).toBe(404);
            expect(response.statusText).toBe("Not Found");
            const test = await response.text();
            expect(test).toBe("todo not found");
        });

        it("should fail to update a todo with no title", async () => {
            const response = await fetch("http://localhost:3000/api/todo/2", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: "This is my updated todo"
                })
            });
            expect(response.ok).toBe(false);
            expect(response.status).toBe(400);
            expect(response.statusText).toBe("Bad Request");
            const test = await response.text();
            expect(test).toBe("title is required for todo");
        })

        it("should return the list of todos", async () => {
            const response = await fetch("http://localhost:3000/api/todo");
            expect(response.ok).toBe(true);
            const json = await response.json();
            expect(json.length).toBe(1);
            expect(json[0].id).toBe(2);
        })

    });


});
