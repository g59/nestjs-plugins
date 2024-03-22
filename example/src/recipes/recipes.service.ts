import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type ConnectionArgs, findAndPaginate } from "nestjs-graphql-relay";
import type { FindManyOptions, Repository } from "typeorm";
import { Recipe } from "./models/recipe";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private readonly recipes: Repository<Recipe>,
  ) {}

  async findById(id: string) {
    return this.recipes.findOneOrFail({ where: { id } });
  }

  async find(
    where: FindManyOptions<Recipe>["where"],
    order: FindManyOptions<Recipe>["order"],
    connArgs: ConnectionArgs,
  ) {
    return findAndPaginate({ where, order }, connArgs, this.recipes);
  }
}
