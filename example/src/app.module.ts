import { join } from "path";
import { SlackModule } from "nestjs-slack-webhook";
import { FirebaseModule } from 'nestjs-firebase'
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
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, '../../dummy.firebase.amin.key.json'),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(__dirname, `./schema.gql`),
      playground: true
    }),
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => config.get("slack")
    }),
    NodeModule,
    RecipesModule,
    NotifyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
