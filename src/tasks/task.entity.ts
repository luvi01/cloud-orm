import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, Long, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task extends BaseEntity {
    
    @PrimaryGeneratedColumn("increment")
    taskId: Long;

    @Column('varchar', { length: 500 })
    title: string

    @Column('varchar', { length: 500 })
    description: string

    @ManyToOne(() => User, user => user.tasks, { eager: true })
    @JoinColumn({ name: "userId" })
    user: User;


}
