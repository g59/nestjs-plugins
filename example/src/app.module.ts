import { join } from "path";
import { SlackModule } from "nestjs-slack";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NodeModule } from "./node/node.module";
import { RecipesModule } from "./recipes/recipes.module";
import { NotifyModule } from "./notify/notify.module";
import slackConfig from "./config/slack";

const isProduction = process.env.NODE_ENV === "production";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [slackConfig]
    }),
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
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get<string>("slackWebhookUrl") ?? "SLACK_WEBHOOK_URL"
      })
    }),
    NodeModule,
    RecipesModule,
    NotifyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
