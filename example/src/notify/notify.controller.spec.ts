import { Test, TestingModule } from "@nestjs/testing";
import { NotifyController } from "./notify.controller";
import { NotifyService } from './notify.service';
import { createSlackServiceMock } from '../testing/slack';

describe("Notify Controller", () => {
  let controller: NotifyController;
  let slack: ReturnType<typeof createSlackServiceMock>;

  beforeEach(async () => {
    slack = createSlackServiceMock()
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifyController],
      providers: [NotifyService, slack]
    }).compile();

    controller = module.get<NotifyController>(NotifyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
