import axios from "axios";
import { prisma } from "../utils/prisma";
import { Request, Response } from "express";

const getPokemon = async(req: Request, res: Response) => {
    try {
        return res.status(200).json({message: 'prueba numero 2'})
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export { getPokemon }

