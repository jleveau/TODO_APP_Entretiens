import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import api from './api';

export default class Server {

    private port: number;
    private app: Express;
    private server: HttpServer | null = null;


    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.port, () => {
                api(this.app);
                console.log(`Server listening on port ${this.port}`);
                resolve();
            });
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server?.close(() => {
                console.log("Server closed");
                resolve();
            });
        });
    }
}