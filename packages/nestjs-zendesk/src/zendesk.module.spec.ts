import { ZendeskModule } from "./";
import { Test } from "@nestjs/testing";

describe("ZendeskModule", () => {
  let module: ZendeskModule;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ZendeskModule],
    }).compile();

    module = moduleFixture.get(ZendeskModule);
  });

  it("defined", () => expect(module).toBeDefined());

  it("forRoot", () =>
    expect(
      ZendeskModule.forRoot({
        username: "name",
        token: "token",
        remoteUri: "http://example.com",
      })
    ).toMatchSnapshot());

  it("forRootAsync", () =>
    expect(ZendeskModule.forRootAsync({})).toMatchSnapshot());
});
