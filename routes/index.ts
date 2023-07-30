import { Request, Response, Router } from "express";
import { getPokemon } from "../controllers/getPokemon";

const router = Router();

router.get('/prueba', getPokemon)

export { router }