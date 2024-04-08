import { User } from "../login/user";

export class Client{

    id:number;
    name: String;
    phone: String
    emailClient: string
    cpf:String;
    Users: User | null
    dateRegister: String | null;
}