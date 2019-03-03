
import { AbstractRepository, EntityRepository, FindConditions } from 'typeorm';
import Todo from '../entity/Todo';

const OFFSET = 7;
const PREFIX = 'prefix_';

@EntityRepository(Todo)
export default class TodoRepository extends AbstractRepository<Todo> {
  public save(todo: Todo): Promise<Todo> {
    return this.manager.save(todo);
  }
  public findIncomplete(): Promise<Todo[]> {
    return this.repository.createQueryBuilder('todo')
      .innerJoinAndSelect('todo.metadata', 'metadata')
      .innerJoinAndSelect('todo.author', 'author')
      .leftJoinAndSelect('todo.categories', 'category')
      .where('todo."isComplete" = :value', { value: false })
      .cache(true)
      .getMany();
  }
  public find(conditions?: FindConditions<Todo>): Promise<Todo[]> {
    return this.repository.find({
      cache: true,
      relations: ['metadata', 'author', 'categories'],
      where: conditions })
      .then((todos) => {
        return todos.map((todo) => {
          return todo;
        });
      });
  }
}
