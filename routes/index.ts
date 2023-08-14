import { Router } from "express";
import { getPokemon } from "../controllers/getPokemon";

const router = Router();

router.get('/pokemons', getPokemon)

export { router }