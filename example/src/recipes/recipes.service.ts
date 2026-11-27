import { DatabaseSync } from "node:sqlite";
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConnectionArgs, findAndPaginate } from "nestjs-graphql-relay";
import { Recipe } from "./models/recipe";

@Injectable()
export class RecipesService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(DatabaseSync) private readonly database: DatabaseSync) {}

  onModuleInit() {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS recipes (
        id varchar PRIMARY KEY NOT NULL,
        title varchar NOT NULL,
        description varchar
      )
    `);
  }

  onModuleDestroy() {
    this.database.close();
  }

  async findById(id: string) {
    const row = this.database
      .prepare("SELECT id, title, description FROM recipes WHERE id = ?")
      .get(id);
    if (!row) {
      throw new NotFoundException("Recipe not found");
    }
    return Object.assign(new Recipe(), row);
  }

  async find(
    where: { title?: string | null } | null | undefined,
    connArgs: ConnectionArgs,
  ) {
    const title = where?.title;
    const filter = title == null ? "" : "WHERE title = ?";
    const parameters = title == null ? [] : [title];

    return findAndPaginate(connArgs, async ({ offset = 0, limit = -1 }) => {
      const rows = this.database
        .prepare(
          `SELECT id, title, description FROM recipes ${filter} ORDER BY rowid LIMIT ? OFFSET ?`,
        )
        .all(...parameters, limit, offset);
      const count = this.database
        .prepare(`SELECT COUNT(*) AS totalCount FROM recipes ${filter}`)
        .get(...parameters);
      const nodes = rows.map((row) => Object.assign(new Recipe(), row));
      const totalCount = Number(count?.totalCount);
      return { nodes, totalCount };
    });
  }
}
