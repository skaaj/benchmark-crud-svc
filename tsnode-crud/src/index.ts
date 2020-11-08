import * as express from "express";
import { Connection, createConnection } from "typeorm";
import { Server, ServiceFactory } from "typescript-rest";
import { PingController } from "./components/ping/ping.controller";
import { UsersController } from "./components/users/users.controller";
import { User } from "./components/users/users.entity";
import { UserRepository } from "./components/users/users.repository";

function connectToDatabase() {
    return createConnection({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "main",
        entities: [
            User
        ],
        synchronize: true,
        logging: false,
        useUnifiedTopology: true
    })
}

class Factory implements ServiceFactory {
    usersRepo: UserRepository;
    usersCtrl: UsersController;

    constructor(conn: Connection) {
        this.usersRepo = conn.getMongoRepository(User);
        this.usersCtrl = new UsersController(this.usersRepo);
    }

    create(serviceClass: any) {
        if(serviceClass['name'] == 'UsersController') {
            return this.usersCtrl;
        } else {
            return new serviceClass();
        }
    }

    public getTargetClass(serviceClass: Function) {
        return serviceClass as FunctionConstructor;
    }
}

let app: express.Application = express();
let port: number = 9001;

connectToDatabase()
    .then(conn => {
        Server.registerServiceFactory(new Factory(conn));
        Server.buildServices(app, PingController, UsersController);
        
        app.listen(port, () => {
          console.log(`Server listening on port ${port}!`);
        });
    })