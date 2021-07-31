import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"

@Entity('projects')
export class Project {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    projectName: string;

    @Column()
    projectDescription: string;

    @Column()
    projectImageUrl: string;

    @Column()
    projectSiteUrl: string;

    @Column()
    projectGithubUrl: string;
}