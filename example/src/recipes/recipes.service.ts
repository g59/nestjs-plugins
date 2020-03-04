import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { findAndPaginate, ConnectionArgs } from "nestjs-relay";
import { FindManyOptions, Repository } from "typeorm";
import { Recipe } from "./models/recipe";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipes: Repository<Recipe>
  ) {}

  async find(
    where: FindManyOptions<Recipe>["where"],
    order: FindManyOptions<Recipe>["order"],
    connArgs: ConnectionArgs
  ) {
    const connection = await findAndPaginate(
      { where, order },
      connArgs,
      this.recipes
    );
    const count = await this.recipes.count({ where });
    return {
      ...connection,
      aggregate: { count }
    };
  }
}
