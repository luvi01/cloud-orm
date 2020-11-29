import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, BaseEntity, Long } from 'typeorm'
import * as bcrypt from "bcrypt";
import { Task } from 'src/tasks/task.entity';


@Entity('user')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment') 
    userId: Long

    @Column('varchar', { length: 500, unique: true})
    email: String

    @Column('varchar', { length: 500 })
    name: String

    @Column('varchar', { length: 500 })
    passwordHash: String

    @Column('varchar', { length: 500 })
    salt: String

    tasks: Task[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.passwordHash;
    }
}
