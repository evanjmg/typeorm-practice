
import Todo from '../entity/Todo';

import { Request, Response } from 'express';
import { getConnection, Repository } from 'typeorm';
import { validate } from 'class-validator';

import Author from '../entity/Author';
import TodoMetadata from '../entity/TodoMetadata';
import TodoRepository from '../respositories/todo.repository';
import { generateCategories } from './categories.service';

let repository: TodoRepository;
let todoMetadataRepository: Repository<TodoMetadata>;
let authorRepository: Repository<Author>;
const initialize = () => {
  if (repository === undefined) {
    const connection = getConnection();
    repository = connection.getCustomRepository(TodoRepository);
    todoMetadataRepository = connection.getRepository(TodoMetadata);
    authorRepository = connection.getRepository(Author);
  }
};

export const create = async (req: Request, res: Response) => {
  initialize();
  const todo = new Todo();
  try {
    let author: Author;
    const authors = await authorRepository.find();
    if (authors.length === 0) {
      author = new Author();
      author.name = 'John Doe';
      await authorRepository.save(author);
    } else {
      author = authors[0];
    }
    const todoMetadata = new TodoMetadata();
    todoMetadata.comment = 'Hello comment';
    todo.name = req.body && req.body.name
    const errors = await validate(todo);
    if (errors.length > 0) {
        throw errors[0];
    }
    const { category1, category2 } = await generateCategories();
    todo.author = author;
    todo.metadata = todoMetadata;
    todo.categories = [category1, category2];
    await todoMetadataRepository.save(todoMetadata);
    await repository.save(todo);
    res.send(todo);
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: err.constraints[Object.keys(err.constraints)[0]] });
  }
};

export const read = async (req: Request, res: Response) => {
  initialize();

  const todos = await repository.find();
  res.send(todos);
};

export const readTodosIncomplete = async (_: Request, res: Response) => {
  initialize();
  const todos = await repository.find({ isComplete: false });
  res.send(todos);
};
export const readTodosIncomplete2 = async (_: Request, res: Response) => {
  initialize();
  const todos = await repository.findIncomplete();
  res.send(todos);
};
