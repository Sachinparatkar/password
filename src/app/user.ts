import { Task } from "./task";
export class User {
    id: Number;
    name: String;
    username: String;
    password: String;
    securityCode: String;
    newpassword: String;
    confirmpassword: String;
    task: Task[];
}

