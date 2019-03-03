
import { NextFunction, Request, Response } from 'express';
import { getConnection, Repository } from 'typeorm';
import Category from '../entity/Category';
let initialized = false;
let categoryRepository: Repository<Category>;

const initialize = () => {
  if (!initialized) {
    initialized = true;
    const connection = getConnection();
    categoryRepository = connection.getRepository(Category);
  }
};

export const generateCategories = async () => {
  let category1: Category;
  let category2: Category;
  initialize();
  const categories = await categoryRepository.find();
  if (categories.length === 0) {
    category1 = new Category();
    category1.name = 'One';
    category2 = new Category();
    category2.name = 'Two';
    await categoryRepository.save(category1);
    await categoryRepository.save(category2);
  } else {
    category1 = categories[0];
    category2 = categories[1];
  }
  return { category1, category2 };
};

export const readCategories = async (_: Request, res: Response, next: NextFunction) => {
  initialize();
  try {
    const categories = await categoryRepository.find({ relations: ['todos'] });
    res.send(categories);
  } catch (error) {
    next(error);
  }
};
