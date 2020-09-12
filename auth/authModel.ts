import {dbConfig} from "../database/dbConfig";


interface IUser{
    username: string;
    password: string;
}

export async function findById(id:string){
    return dbConfig("users")
        .select("id", "username")
        .where({id})
        .first();
}

export async function createUser(user:IUser) {
    console.log("user to insert ", user);
    const [id] = await dbConfig("users").insert(user);
    return findById(id);
}

export function getUsers() {
    return dbConfig("users").select("id", "username");

}

export function findByUsername(username:string) {
    return dbConfig("users")
        .select("id", "username", "password")
        .where({username});

}