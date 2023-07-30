import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";

const PORT = process.env.PORT

const server = express();

server.use(cors({
    origin: '*'
}))

server.use('/', router)

server.listen(PORT, () => console.log(`Listening on port ${PORT}`)
)