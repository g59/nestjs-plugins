import { Test, TestingModule } from "@nestjs/testing";
import { NotifyService } from "./notify.service";

describe("NotifyService", () => {
  let service: NotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifyService]
    }).compile();

    service = module.get<NotifyService>(NotifyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
