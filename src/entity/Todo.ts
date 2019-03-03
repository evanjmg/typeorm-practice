import { Length, Validate } from 'class-validator';

import {
  AfterInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  } from 'typeorm';
import Author from './Author';
import CapitalLetterValidator from '../validators/capital-letter';
import TodoMetadata from './TodoMetadata';
import Category from './Category';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
    public id: number;

  @Column()
    @Length(0, 20)
    @Validate(CapitalLetterValidator)
    public name: string = '';

  @ManyToMany(() => Category, (category) => category.todos)
    @JoinTable()
    public categories: Category[];

  @Index()
    @Column()
    public isComplete: boolean = false;

  @Index()
    @ManyToOne(() => Author, (author) => author.todos)
    public author: Author;

  @OneToOne(() => TodoMetadata)
    @JoinColumn()
    public metadata: TodoMetadata;

  @AfterInsert()
    public handleAfterInsert() {
      console.log(`INSERTED TODO WITH ID: ${this.id}`);
    }
}

export default Todo;
