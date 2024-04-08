import { User } from "../login/user";

export class Client{

    id:number;
    name: String;
    cpf:String;
    Users: User | null
    dateRegister: String | null;
}