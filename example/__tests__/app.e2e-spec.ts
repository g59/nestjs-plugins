import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

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
  it.skip("defined", () => expect(app).toBeDefined());
});
