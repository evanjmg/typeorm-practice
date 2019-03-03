import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Todo from './Todo';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
    public id: number;

  @ManyToMany(() => Todo, (todo) => todo.categories)
    public todos: Todo[];

  @Column()
    public name: string;
}
