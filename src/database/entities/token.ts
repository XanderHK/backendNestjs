import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"

@Entity('tokens')
export class Token {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    userId: ObjectID;

    @Column()
    token: string;
}