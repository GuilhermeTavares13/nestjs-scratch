export default class CreateUserDto {
    name: string;
    age: number;

    constructor(name = "", age = 0) {
        this.name = name;
        this.age = age;
    }
}