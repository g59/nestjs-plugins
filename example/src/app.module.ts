import { join } from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirebaseModule } from "nestjs-firebase";
import { SlackModule } from "nestjs-slack-webhook";
import { ZendeskModule } from "nestjs-zendesk";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import slackConfig from "./config/slack";
import zendeskConfig from "./config/zendesk";
import { NodeModule } from "./node/node.module";
import { NotifyModule } from "./notify/notify.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ZendeskModule as ZendeskWrapperModule } from "./zendesk/zendesk.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [slackConfig, zendeskConfig],
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "nestjs-plugins-test",
      entities: [join(__dirname, "./recipes/models/recipe.[t|j]s")],
      synchronize: true,
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(
        __dirname,
        "../../dummy.firebase.amin.key.json",
      ),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(__dirname, "./schema.gql"),
      playground: true,
      driver: ApolloDriver,
    }),
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => config.get("slack"),
    }),
    ZendeskModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => config.get("zendesk"),
    }),
    NodeModule,
    RecipesModule,
    NotifyModule,
    ZendeskWrapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
