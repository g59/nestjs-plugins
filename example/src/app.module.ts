import { join } from "path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NodeModule } from "./node/node.module";
import { RecipesModule } from "./recipes/recipes.module";

const isProduction = process.env.NODE_ENV === "production";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "nestjs-plugins-test",
      entities: [join(__dirname, "./recipes/models/recipe.[t|j]s")],
      synchronize: true
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: isProduction ? true : join(__dirname, `./schema.gql`),
      playground: true
    }),
    NodeModule,
    RecipesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
