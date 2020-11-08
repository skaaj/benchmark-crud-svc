import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    nickname!: string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    age!: number;
}