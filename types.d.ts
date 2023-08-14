
export interface Info {
    name : string,
    url : string
}

export interface Pokemon {
    id : string,
    name: string,
    hp: number,
    attack: number,
    defense: number,
    speed: number,
    height: number,
    weight: number,
    image: string,
    types: string[]
}

export interface ObjectType {
    slot : number,
    type : Type
}

export interface Type {
    name: string,
    url : string
}