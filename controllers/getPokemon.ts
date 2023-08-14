import axios from "axios";
import { prisma } from "../utils/prisma";
import { Request, Response } from "express";
import { type Info, Pokemon, ObjectType } from "../types";

const getPokemon = async(req: Request, res: Response) => {
    try {
        const querys = req.query;
        const name  = querys.name?.toString()

        if(!name) {
            const pokemons = await prisma.pokemon.findMany({
                include: {
                    types: true,
                }
            })

            const infoPokemons = pokemons?.map( pokemon => {
                const types = pokemon.types.map(type => type.name)
                return {
                    id: pokemon.id, 
                    name: pokemon.name, 
                    image: pokemon.image, 
                    hp: pokemon.hp, 
                    attack: pokemon.attack, 
                    defense: pokemon.defense, 
                    speed: pokemon.speed, 
                    weight: pokemon.weight, 
                    types
                }
            })
    
    
            const url = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60')
                const infoUrl = url.data.results;
    
                const pokeInfo : Pokemon[] = await axios.all(
                    infoUrl.map (async (poke : Info) => {
                    let info = await axios.get(poke.url)
                    return {
                        id: info.data.id,
                        name: info.data.name,
                        hp: info.data.stats[0].base_stat,
                        attack: info.data.stats[1].base_stat,
                        defense: info.data.stats[0].base_stat,
                        speed: info.data.stats[5].base_stat,
                        height: info.data.height,
                        weight: info.data.weight,
                        image: info.data.sprites.other.dream_world.front_default,
                        types: info.data.types.map( (type : ObjectType ) => type.type.name)                    
                    }
                    })
                );
    
            return res.status(200).json(infoPokemons?.concat(pokeInfo))
        };

        const findPokemon = await prisma.pokemon.findFirst({
            include: {
                types: true
            },
            where: {
                name
            }
        });

        const types = findPokemon?.types.map(type => type.name)

        if (!findPokemon) {
          const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`);

        //   if (!data) throw Error('This pokemon is not around!')

          return res.status(200).json({
            id: data.id,
            name: data.name,
            types: data.types,
            height: data.height,
            weight: data.weight
          });
        }

        return res.status(200).json({
            id: findPokemon?.id, 
            name: findPokemon?.name, 
            image: findPokemon?.image, 
            hp: findPokemon?.hp, 
            attack: findPokemon?.attack, 
            defense: findPokemon?.defense, 
            speed: findPokemon?.speed, 
            weight: findPokemon?.weight, 
            types
        });

    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export { getPokemon }

