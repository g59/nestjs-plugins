import { afterEach, beforeAll, describe, expect, it } from "@jest/globals";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

describe("app (e2e)", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  afterEach(() => app.close());

  // TODO fix https://github.com/nestjs/graphql/issues/2307
  it("defined", () => expect(app).toBeDefined());
});
