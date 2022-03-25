import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export function createMockRepository<T>(Entity: Function) {
  const useValue: MockType<Partial<Repository<T>>> = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    findByIds: jest.fn(),
    findOneOrFail: jest.fn(),
    create: jest.fn(),
    count: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  return {
    provide: getRepositoryToken(Entity),
    useValue,
  };
}
