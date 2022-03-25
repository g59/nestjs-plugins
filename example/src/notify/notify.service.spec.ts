import { Test, TestingModule } from "@nestjs/testing";
import { createSlackServiceMock } from "../testing/slack";
import { NotifyService } from "./notify.service";

describe("NotifyService", () => {
  let service: NotifyService;
  let slack: ReturnType<typeof createSlackServiceMock>;

  beforeEach(async () => {
    slack = createSlackServiceMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifyService, slack],
    }).compile();

    service = module.get<NotifyService>(NotifyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
