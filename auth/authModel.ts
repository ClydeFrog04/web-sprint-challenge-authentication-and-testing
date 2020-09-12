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
    const [id] = await dbConfig("users").insert(user);
    return findById(id);
}

export function getUsers() {
    return dbConfig("users").select("id", "username");

}

export function findBy(filter:any) {
    return dbConfig("users")
        .select("id", "username", "password")
        .where(filter);

}