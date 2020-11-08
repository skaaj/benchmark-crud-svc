import { GET, Path, POST } from 'typescript-rest';
import { UserRepository } from './users.repository';
import { User } from './users.entity';

@Path('/users')
export class UsersController {
    private usersRepo: UserRepository;

    constructor(
        usersRepo: UserRepository
    ) {
        this.usersRepo = usersRepo;
    }

    @GET
    public async getUsers(): Promise<any> {
        return this.usersRepo.find();
    }

    @POST
    public async insertMany(): Promise<any> {
        const tmp = [];

        let nicknames = [
            "daffodil", "huggie", "ducky",
            "skinnyminny", "scarlet", "lilmama",
            "fido", "ladybug", "dunce"
        ]
        
        let firstnames = [
            "Nico", "Branson", "Van",
            "Jaron", "Keagan", "Reginald",
            "Marie", "Lina", "Kaylyn"
        ]
        
        let lastnames = [
            "Doe", "Mcgee", "Carroll",
            "Edwards", "Mcclain", "Kane",
            "York", "Sparks", "Park"
        ]

        let pickRandomInt = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        let pickRandom = (arr: any) => {
            return arr[pickRandomInt(0, arr.length)]
        }

        for(let i = 0; i < 1000; i++) {
            tmp.push({
                nickname: pickRandom(nicknames) + pickRandomInt(0, 5000),
                firstname: pickRandom(firstnames),
                lastname: pickRandom(lastnames),
                age: pickRandomInt(0, 100)
            });
        }

        return this.usersRepo.insertMany(tmp);
    }
}